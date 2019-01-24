using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.CognitiveSearch.Search;
using Microsoft.CognitiveSearch.Skills.Cryptonyms;
using Microsoft.CognitiveSearch.Skills.Hocr;
using Microsoft.CognitiveSearch.Skills.Image;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;



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
            if (string.IsNullOrEmpty(searchServiceName) || String.IsNullOrEmpty(searchServiceApiKey) || string.IsNullOrEmpty(indexName)) {
                return new BadRequestObjectResult($"{skillName} - Information for the search service is missing");
            }
            SearchClientHelper searchClient = new SearchClientHelper(searchServiceName, searchServiceApiKey, indexName);

            FacetGraphGenerator facetGraphGenerator = new FacetGraphGenerator(searchClient);
            string query = string.IsNullOrEmpty(req.Query["q"].FirstOrDefault()) ? "*" : req.Query["q"].First();
            string facet = string.IsNullOrEmpty(req.Query["f"].FirstOrDefault()) ? "entities" : req.Query["f"].First();
            JObject facetGraph = facetGraphGenerator.GetFacetGraphNodes(query, facet);

            return (ActionResult)new OkObjectResult(facetGraph);
        }


    }
}

