using System;
using System.Collections.Generic;
using Microsoft.Azure.Search;
using Microsoft.Azure.Search.Models;

namespace CogSearchWebApiSkills.AzureSearch
{
    public class SearchClientHelper
    {
        private static SearchServiceClient _searchClient;
        private string IndexName;
        private static string errorMessage;

        public SearchClientHelper(string serviceName, string apiKey, string indexName)
        {
            try
            {
                IndexName = indexName;
                _searchClient = new SearchServiceClient(serviceName, new SearchCredentials(apiKey));
            }
            catch (Exception ex)
            {
                errorMessage = ex.Message.ToString();
            }
        }

        public DocumentSearchResult GetFacets(string searchText, string facetName, int maxCount = 30)
        {
            try
            {
                SearchParameters searchParameters = new SearchParameters()
                {
                    SearchMode = SearchMode.Any,
                    Top = 0,
                    Select = new List<String>() { "id" },
                    Facets = new List<String>() { $"{facetName}, count:{maxCount}" },
                    QueryType = QueryType.Full
                };
                return _searchClient.Indexes.GetClient(IndexName).Documents.Search(searchText, searchParameters);
            }
            catch(Exception ex)
            {
                Console.WriteLine("ERROR QUERYING INDEX: " + ex.Message.ToString() + "\n\n" + ex.StackTrace);
            }
            return null;
        }
    }
}
