/*
 * Description: Program to initialize the resources required to run cognitive search based on Microsoft's JFK Files Demo
 * Author: Neel Patel
 */

using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Azure.Search;
using Microsoft.Azure.Search.Models;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Newtonsoft.Json.Linq;


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

        //Keys and info for cloud resource configuration
        private static keys keys = new keys();

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

            //bool result = RunAsync()
        }

        private static async Task<bool> RunAsync()
        {
            bool result = await DeleteIndexingResources();

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


    }

}

