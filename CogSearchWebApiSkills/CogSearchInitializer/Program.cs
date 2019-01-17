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
            bool result;
            result = await DeleteIndexingResources();
            if (!result)
                return result;
            result = await CreateBlobContainerForImageStore();
            if (!result)
                return result;
            result = await CreateDocumentDataSource();
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
    }

    private static async Task<bool> CreateDocumentsDataSource()
    {
        return true;
    }

}

