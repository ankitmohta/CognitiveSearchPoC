using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using CogSearchWebApiSkills.WebApiSkills;
using CogSearchWebApiSkills.FacetGraphGeneratorSkill;
using CogSearchWebApiSkills.CryptonymsSkill;
using CogSearchWebApiSkills.ImageStoreSkill;
using CogSearchWebApiSkills.HocrGeneratorSkill;
using CogSearchWebApiSkills.TranslatorSkill;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;



namespace CogSearchWebApiSkills
{
    public class CogSearchWebApiSkills
    {
        private static Keys keys = new Keys();
        [FunctionName("facet-graph-nodes")]
        public static IActionResult GetFacetGraphNodes([HttpTrigger(AuthorizationLevel.Function, "get", Route = null)]HttpRequest req, TraceWriter log, TraceWriter log, ExecutionContext executionContext)
        {
            string skillName = executionContext.FunctionName;
            if (!req.QueryString.HasValue)
            {
                return new BadRequestObjectResult($"{skillName} - Requires a query string in the following format: q=SEARCHTERM&f=entities");
            }
            string searchServiceName = keys.SearchServiceName1;
            string searchServiceApiKey = keys.SearchServiceApiKey1;
            string indexName = String.IsNullOrEmpty(req.Headers["IndexName"]) ? Config.AZURE_SEARCH_INDEX_NAME : (string)req.Headers["IndexName"];
            if (string.IsNullOrEmpty(searchServiceName) || String.IsNullOrEmpty(searchServiceApiKey) || string.IsNullOrEmpty(indexName))
            {
                return new BadRequestObjectResult($"{skillName} - Information for the search service is missing");
            }
            SearchClientHelper searchClient = new SearchClientHelper(searchServiceName, searchServiceApiKey, indexName);

            FacetGraphGenerator facetGraphGenerator = new FacetGraphGenerator(searchClient);
            string query = string.IsNullOrEmpty(req.Query["q"].FirstOrDefault()) ? "*" : req.Query["q"].First();
            string facet = string.IsNullOrEmpty(req.Query["f"].FirstOrDefault()) ? "entities" : req.Query["f"].First();
            JObject facetGraph = facetGraphGenerator.GetFacetGraphNodes(query, facet);

            return (ActionResult)new OkObjectResult(facetGraph);
        }


        [FunctionName("link-cryptonyms")]
        public static IActionResult RunCryptonymLinker([HttpTrigger(AuthorizationLevel.Function, "post", Route = null)]HttpRequest req, TraceWriter log, ExecutionContext executionContext)
        {
            string skillName = executionContext.FunctionName;
            IEnumerable<WebApiRequestRecord> requestRecords = WebApiSkillHelpers.GetRequestRecords(req);
            if (requestRecords == null)
            {
                return new BadRequestObjectResult($"{skillName} - Invalid request record array.");
            }

            CryptonymLinker cryptonymLinker = new CryptonymLinker(executionContext.FunctionAppDirectory);
            WebApiSkillResponse response = WebApiSkillHelpers.ProcessRequestRecords(skillName, requestRecords,
                (inRecord, outRecord) =>
                {
                    string word = inRecord.Data["word"] as string;
                    if (word.All(Char.IsUpper) && cryptonymLinker.Cryptonyms.TryGetValue(word, out string description))
                    {
                        outRecord.Data["cryptonym"] = new { value = word, description };
                    }
                    return outRecord;
                });

            return (ActionResult)new OkObjectResult(response);
        }

        [FunctionName("link-cryptonyms-list")]
        public static IActionResult RunCryptonymLinkerForLists([HttpTrigger(AuthorizationLevel.Function, "post", Route = null)]HttpRequest req, TraceWriter log, ExecutionContext executionContext)
        {
            string skillName = executionContext.FunctionName;
            IEnumerable<WebApiRequestRecord> requestRecords = WebApiSkillHelpers.GetRequestRecords(req);
            if (requestRecords == null)
            {
                return new BadRequestObjectResult($"{skillName} - Invalid request record array.");
            }

            CryptonymLinker cryptonymLinker = new CryptonymLinker(executionContext.FunctionAppDirectory);
            WebApiSkillResponse response = WebApiSkillHelpers.ProcessRequestRecords(skillName, requestRecords,
                (inRecord, outRecord) =>
                {
                    var words = JsonConvert.DeserializeObject<JArray>(JsonConvert.SerializeObject(inRecord.Data["words"]));
                    var cryptos = words.Select(jword =>
                    {
                        var word = jword.Value<string>();
                        if (word.All(Char.IsUpper) && cryptonymLinker.Cryptonyms.TryGetValue(word, out string description))
                        {
                            return new { value = word, description };
                        }
                        return null;
                    });

                    outRecord.Data["cryptonyms"] = cryptos.ToArray();
                    return outRecord;
                });

            return (ActionResult)new OkObjectResult(response);
        }

        [FunctionName("image-store")]
        public static async Task<IActionResult> RunImageStore([HttpTrigger(AuthorizationLevel.Function, "post", Route = null)]HttpRequest req, TraceWriter log, ExecutionContext executionContext)
        {
            string skillName = executionContext.FunctionName;
            IEnumerable<WebApiRequestRecord> requestRecords = WebApiSkillHelpers.GetRequestRecords(req);
            if (requestRecords == null || requestRecords.Count() != 1)
            {
                return new BadRequestObjectResult($"{skillName} - Invalid request record array: Skill requires exactly 1 image per request.");
            }

            string blobStorageConnectionString = keys.BlobStorageAccountConnectionString1;
            string blobContainerName = String.IsNullOrEmpty(req.Headers["BlobContainerName"]) ? Config.AZURE_STORAGE_CONTAINER_NAME : (string)req.Headers["BlobContainerName"];
            if (String.IsNullOrEmpty(blobStorageConnectionString) || String.IsNullOrEmpty(blobContainerName))
            {
                return new BadRequestObjectResult($"{skillName} - Information for the blob storage account is missing");
            }
            ImageStore imageStore = new ImageStore(blobStorageConnectionString, blobContainerName);

            WebApiSkillResponse response = await WebApiSkillHelpers.ProcessRequestRecordsAsync(skillName, requestRecords,
                async (inRecord, outRecord) =>
                {
                    string imageData = inRecord.Data["imageData"] as string;
                    string imageUri = await imageStore.UploadToBlob(imageData, Guid.NewGuid().ToString());
                    outRecord.Data["imageStoreUri"] = imageUri;
                    return outRecord;
                });

            return (ActionResult)new OkObjectResult(response);
        }

        [FunctionName("hocr-generator")]
        public static IActionResult RunHocrGenerator([HttpTrigger(AuthorizationLevel.Function, "post", Route = null)]HttpRequest req, TraceWriter log, ExecutionContext executionContext)
        {
            string skillName = executionContext.FunctionName;
            IEnumerable<WebApiRequestRecord> requestRecords = WebApiSkillHelpers.GetRequestRecords(req);
            if (requestRecords == null || requestRecords.Count() != 1)
            {
                return new BadRequestObjectResult($"{skillName} - Invalid request record array: Skill requires exactly 1 image per request.");
            }

            WebApiSkillResponse response = WebApiSkillHelpers.ProcessRequestRecords(skillName, requestRecords,
                (inRecord, outRecord) =>
                {
                    List<OcrImageMetadata> imageMetadataList = JsonConvert.DeserializeObject<List<OcrImageMetadata>>(JsonConvert.SerializeObject(inRecord.Data["ocrImageMetadataList"]));
                    Dictionary<string, string> annotations = JsonConvert.DeserializeObject<JArray>(JsonConvert.SerializeObject(inRecord.Data["wordAnnotations"]))
                                                    .Where(o => o.Type != JTokenType.Null)
                                                    .GroupBy(o => o["value"].Value<string>())
                                                    .Select(g => g.First())
                                                    .ToDictionary(o => o["value"].Value<string>(), o => o["description"].Value<string>());

                    List<HocrPage> pages = new List<HocrPage>();
                    for (int i = 0; i < imageMetadataList.Count; i++)
                    {
                        pages.Add(new HocrPage(imageMetadataList[i], i, annotations));
                    }
                    HocrDocument hocrDocument = new HocrDocument(pages);
                    outRecord.Data["hocrDocument"] = hocrDocument;
                    return outRecord;
                });

            return (ActionResult)new OkObjectResult(response);
        }

        /// <summary>
        /// Note that this function can translate up to 1000 characters. If you expect to need to translate more characters, use 
        /// the paginator skill before calling this custom enricher
        /// </summary>
        [FunctionName("Translate")]
        public static IActionResult Run([HttpTrigger(AuthorizationLevel.Function, "post", Route = null)]HttpRequest req, TraceWriter log)
        {
            log.Info("C# HTTP trigger function processed a request.");

            string recordId = null;
            string originalText = null;
            string originalLanguage = null;
            string translatedText = null;

            string requestBody = new StreamReader(req.Body).ReadToEnd();
            dynamic data = JsonConvert.DeserializeObject(requestBody);

            // Validation
            if (data?.values == null)
            {
                return new BadRequestObjectResult(" Could not find values array");
            }
            if (data?.values.HasValues == false || data?.values.First.HasValues == false)
            {
                // It could not find a record, then return empty values array.
                return new BadRequestObjectResult(" Could not find valid records in values array");
            }

            recordId = data?.values?.First?.recordId?.Value as string;
            originalText = data?.values?.First?.data?.text?.Value as string;
            originalLanguage = data?.values?.First?.data?.language?.Value as string;

            if (recordId == null)
            {
                return new BadRequestObjectResult("recordId cannot be null");
            }

            if (!originalLanguage.Contains("en"))
            {
                translatedText = Translator.TranslateText(originalText, "en").Result;
            }
            else
            {
                translatedText = originalText;
            }

            // Put together response.
            WebApiResponseRecord responseRecord = new WebApiResponseRecord();
            responseRecord.Data = new Dictionary<string, object>();
            responseRecord.RecordId = recordId;
            responseRecord.Data.Add("text", translatedText);

            WebApiEnricherResponse response = new WebApiEnricherResponse();
            response.values = new List<WebApiResponseRecord>();
            response.values.Add(responseRecord);

            return (ActionResult)new OkObjectResult(response);
        }
    }
}

