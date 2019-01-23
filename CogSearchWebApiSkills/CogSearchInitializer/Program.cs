/*
 * Description: Application to initialize the resources required to run cognitive search based on Microsoft's JFK Files Demo
 * Author: Neel Patel
 */

using Microsoft.Azure.Search;
using Microsoft.Azure.Search.Models;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;


namespace CogSearchInitializer
{
    class Program
    {
        /*
         * Names for cloud resource configuration
         * IF YOU CHANGE THESE VALUES YOU MUST ALSO CHANGE THEM IN THE CogSearchWebApiSkills IN THE Config.cs FILE
         */
        private const string DataSourceName = "datasource";
        private const string IndexName = "index";
        private const string SkillSetName = "skillset";
        private const string IndexerName = "indexer";
        private const string SynonymMapName = "cryptonyms";
        private const string BlobContainerNameForImageStore = "imagestoreblob";

        //Keys and info for cloud resource configuration
        private static Keys keys = new Keys();

        //Set to false to to disable debug information
        private static bool DebugMode = true;

        //Set to true if frontend is deployed with the initializer
        private static bool ShouldDeployWebsite = false;

        /*
         * Set up Clients
         */
        private static ISearchServiceClient _searchClient;
        private static HttpClient _httpClient = new HttpClient();
        private static String _searchServiceEndpoint;
        private static String _azureFunctionHostKey;

        static void Main(string[] args)
        {
            string searchServiceName = keys.SearchServiceName1;
            string searchServiceApiKey = keys.SearchServiceApiKey1;

            _searchClient = new SearchServiceClient(searchServiceName, new SearchCredentials(searchServiceApiKey));
            _httpClient.DefaultRequestHeaders.Add("api-key", searchServiceApiKey);
            _searchServiceEndpoint = String.Format("https://{0}.{1}", searchServiceName, _searchClient.SearchDnsSuffix);

            bool result = RunInitializerAsync().GetAwaiter().GetResult();
            if (!result)
            {
                Console.WriteLine("ERROR: ENABLE DEBUG MODE TO SEE DETAILS");
            }
            else
            {
                Console.WriteLine("SUCCESS: ALL OPERATIONS COMPLETED SUCCESSFULLY");
            }
            Console.WriteLine("PRESS ANY KEY TO EXIT");
            Console.ReadKey();
        }


        /*
         * This function controls the operations of the initializer
         * for cognitive search
         */
        private static async Task<bool> RunInitializerAsync()
        {
            bool result;
            result = await DeleteIndexingResources();
            if (!result)
                return result;
            result = await CreateBlobContainerForImageStore();
            if (!result)
                return result;
            result = await CreateDocumentsDataSource();
            if (!result)
                return result;
            result = await CreateSkillSet();
            if (!result)
                return result;
            result = await CreateSynonyms();
            if (!result)
                return result;
            result = await CreateIndex();
            if (!result)
                return result;
            result = await CreateIndexer();
            if (!result)
                return result;
            result = await CheckIndexerStatus();
            if (!result)
                return result;


            return result;
        }


        /*
         * This function deletes all of the following indexing resources if they exist:
         * DataSource, Index, Indexer, and SynonymMap
         */
        private static async Task<bool> DeleteIndexingResources()
        {
            Console.WriteLine("Deleting DataSource, Index, Indexer, and SynonymMap if they exist...");
            try
            {
                await _searchClient.DataSources.DeleteAsync(DataSourceName);
                await _searchClient.Indexes.DeleteAsync(IndexName);
                await _searchClient.Indexers.DeleteAsync(IndexerName);
                await _searchClient.SynonymMaps.DeleteAsync(SynonymMapName);
            }
            catch (Exception ex)
            {
                if (DebugMode)
                {
                    Console.WriteLine("ERROR DELETING RESOURCES: " + ex.Message + "\n\n" + ex.StackTrace);
                }
                return false;
            }
            return true;
        }

        /*
         * This function creates a blob container on Azure for the document preview image store
         * if it does not already exist.
         * Sets the access permissions for eht container to public.
         */
        private static async Task<bool> CreateBlobContainerForImageStore()
        {
            Console.WriteLine("Creating Blob Container to Store File Preview Images from the Image Store Skill...");
            try
            {
                CloudStorageAccount imageStorageAccount = CloudStorageAccount.Parse(keys.BlobStorageAccountConnectionString1);
                CloudBlobClient imageStoreClient = imageStorageAccount.CreateCloudBlobClient();
                CloudBlobContainer imageStoreContainer = imageStoreClient.GetContainerReference(BlobContainerNameForImageStore);

                await imageStoreContainer.CreateIfNotExistsAsync();

                //Set Access Permissions for the Image Store to public
                BlobContainerPermissions permissions = await imageStoreContainer.GetPermissionsAsync();
                permissions.PublicAccess = BlobContainerPublicAccessType.Container;
                await imageStoreContainer.SetPermissionsAsync(permissions);
            }
            catch (Exception ex)
            {
                if (DebugMode)
                {
                    Console.WriteLine("ERROR CREATING BLOB CONTAINER FOR IMAGE STORE: " + ex.Message + "\n\n" + ex.StackTrace);
                }
                return false;
            }
            return true;
        }

        /*
         * This function creates the datasource in which the documents are stored in.
         * It also links the datasource to the Azure Search resources.
         */
        private static async Task<bool> CreateDocumentsDataSource()
        {
            Console.WriteLine("Creating Data Source for Documents...");
            try
            {
                DataSource dataSource = DataSource.AzureBlobStorage(
                    name: DataSourceName,
                    storageConnectionString: keys.FilesStorageAccountConnectionString1,
                    containerName: keys.FilesBlobContainerName1,
                    description: "Data source for Cognitive Search Demo."
                    );

                //Link datasource to Azure Search
                await _searchClient.DataSources.CreateAsync(dataSource);
            }
            catch (Exception ex)
            {
                if (DebugMode)
                {
                    Console.WriteLine("Error Creating the Document Data Source: " + ex.Message + "\n\n" + ex.StackTrace);
                }
                return false;
            }
            return true;
        }

        /*
         * This function creates the skillset
         * 
         */
        private static async Task<bool> CreateSkillSet()
        {
            Console.WriteLine("Creating Skill Set...");
            try
            {
                if (_azureFunctionHostKey == null)
                {
                    _azureFunctionHostKey = await Keys.GetAzureFunctionHostKey(_httpClient);
                }
                using (StreamReader r = new StreamReader("skillset.json"))
                {
                    string json = r.ReadToEnd();
                    json = json.Replace("[AzureFunctionEndpointUrl]", String.Format("https://{0}.azurewebsites.net", keys.AzureFunctionSiteName1));
                    json = json.Replace("[AzureFunctionDefaultHostKey]", _azureFunctionHostKey);
                    json = json.Replace("[BlobContainerName]", BlobContainerNameForImageStore);
                    string uri = String.Format("{0}/skillsets/{1}?api-version=2017-11-11-Preview", _searchServiceEndpoint, SkillSetName);
                    HttpContent content = new StringContent(json, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = await _httpClient.PutAsync(uri, content);

                    if (DebugMode)
                    {
                        string responseText = await response.Content.ReadAsStringAsync();
                        Console.WriteLine("Response from creating skill set: " + responseText);
                    }
                    if (!response.IsSuccessStatusCode)
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                if (DebugMode)
                {
                    Console.WriteLine("ERROR CREATING SKILLSET: " + ex.Message + "\n\n" + ex.StackTrace);
                }
                return false;
            }
            return true;
        }

        /*
         * This method creates the synoyms used by Azure Search
         * 
         */
        private static async Task<bool> CreateSynonyms()
        {
            Console.WriteLine("Creating Synonym Map...");
            try
            {
                SynonymMap synonyms = new SynonymMap(SynonymMapName, SynonymMapFormat.Solr, @"");
                await _searchClient.SynonymMaps.CreateAsync(synonyms);
            }
            catch (Exception ex)
            {
                if (DebugMode)
                {
                    Console.WriteLine("ERROR CREATING SYNONYM MAP: " + ex.Message + "\n\n" + ex.StackTrace);
                }
                return false;
            }
            return true;
        }

        /*
         * This function creates the index in the Azure Search Service
         * and replaces SynonymMapName in index.json
         */
        private static async Task<bool> CreateIndex()
        {
            Console.WriteLine("Creating Index...");
            try
            {
                using (StreamReader r = new StreamReader("index.json"))
                {
                    string json = r.ReadToEnd();
                    json = json.Replace("[SynonymMapName", SynonymMapName);
                    string uri = String.Format("{0}/indexes/{1}?api-version=2017-11-11-Preview", _searchServiceEndpoint, IndexName);
                    HttpContent content = new StringContent(json, Encoding.UTF8, "application.json");
                    HttpResponseMessage response = await _httpClient.PutAsync(uri, content);
                    if (DebugMode)
                    {
                        string responseText = await response.Content.ReadAsStringAsync();
                        Console.WriteLine("Create Index Response: " + responseText);
                    }
                    if (!response.IsSuccessStatusCode)
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                if (DebugMode)
                {
                    Console.WriteLine("ERROR CREATING INDEX: " + ex.Message + "/n/n" + ex.StackTrace);
                }
                return false;
            }
            return true;
        }


        /*
         * This function creates the indexer for azure search
         * It replaces the IndexerName, DataSourceName, IndexName, and SkillsetName in the indexer.json file
         */
        private static async Task<bool> CreateIndexer()
        {
            Console.WriteLine("Creating Indexer...");
            try
            {
                using (StreamReader r = new StreamReader("indexer.json"))
                {
                    string json = r.ReadToEnd();
                    json = json.Replace("[IndexerName]", IndexerName);
                    json = json.Replace("[DataSourceName]", DataSourceName);
                    json = json.Replace("[IndexName]", IndexName);
                    json = json.Replace("[SkillsetName]", SkillSetName);
                    string uri = String.Format("{0}/indexers/{1}?api-version=2017-11-11-Preview", _searchServiceEndpoint, IndexerName);
                    HttpContent content = new StringContent(json, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = await _httpClient.PutAsync(uri, content);
                    if (DebugMode)
                    {
                        string responsetext = await response.Content.ReadAsStringAsync();
                        Console.WriteLine("Create Indexer response: \n{0}", responsetext);
                    }
                    if (!response.IsSuccessStatusCode)
                    {
                        return false;
                    }
                }
            }
            catch (Exception ex)
            {
                if (DebugMode)
                {
                    Console.WriteLine("Error creating idexer: {0}", ex.Message);
                }
                return false;
            }
            return true;
        }

        /*
         * This function checks the status of the indexer every 5 seconds
         * and writes the current status to the console
         */
        private static async Task<bool> CheckIndexerStatus()
        {
            Console.WriteLine("Waiting for indexing to complete...");
            IndexerExecutionStatus requestStatus = IndexerExecutionStatus.InProgress;
            try
            {
                await _searchClient.Indexers.GetAsync(IndexerName);
                while (requestStatus.Equals(IndexerExecutionStatus.InProgress))
                {
                    Thread.Sleep(5000);
                    IndexerExecutionInfo info = await _searchClient.Indexers.GetStatusAsync(IndexerName);
                    requestStatus = info.LastResult.Status;
                    if (DebugMode)
                    {
                        Console.WriteLine("Indexer Status: " + requestStatus.ToString());
                    }
                }

            }
            catch (Exception ex)
            {
                if (DebugMode)
                {
                    Console.WriteLine("ERROR RETREIVING INDEXER STATUS: " + ex.Message + "\n\n" + ex.StackTrace);
                }
                return false;
            }
            return requestStatus.Equals(IndexerExecutionStatus.Success);
        }
    }
}

