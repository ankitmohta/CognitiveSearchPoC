/*
 * Description: Program to initialize the resources required to run cognitive search based on Microsoft's JFK Files Demo
 * Author: Neel Patel
 */

using System;

namespace CogSearchInitializer
{
    class Program
    {
        /*
         * Names for cloud resource configuration
         */
        private const string DataSourceName = "datasource";
        private const string IndexName = "index";
        private const string SkillSetName = "skillset";
        private const string IndexerName = "indexer";
        private const string SynonymMapName = "cryptonyms";
        private const string BlobContainerNameForImageStore = "imagestoreblob";

        //Set to false to to disable debug information
        private static bool DebugMode = true;

        //Set to true if frontend is deployed with the initializer
        private static bool ShouldDeployWebsite = false;

        /*
         * Set up Azure Clients
         */
        private static Microsoft.Azure.Search.ISearchServiceClient _searchClient;
        private static System.Net.Http.HttpClient _httpClient = new System.Net.Http.HttpClient();
        private static String _searchServiceEndpoint;
        private static String _azureFunctionHostKey;
    }

}
