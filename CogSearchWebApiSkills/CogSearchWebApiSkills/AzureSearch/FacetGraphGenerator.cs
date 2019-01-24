using System.Collections.Generic;
using System.Linq;
using Microsoft.Azure.Search.Models;
using Newtonsoft.Json.Linq;

namespace CogSearchWebApiSkills
{
    public class FacetGraphGenerator
    {
        private SearchClientHelper _searchHelper;

        public FacetGraphGenerator(SearchClientHelper searchClient)
        {
            _searchHelper = searchClient;
        }

        public JObject GetFacetGraphNodes(string query, string facetName)
        {
            //Calculate 3 levels of nodes
            JObject dataset = new JObject();
            int MaxEdges = 20;
            int MaxLevels = 3;
            int CurrentLevel = 1;
            int CurrentNodes = 0;

            List<FDGraphEdges> FDEdgeList = new List<FDGraphEdges>();
            //Create a node map that will map a cfacet to a node - nodemap[0] always equals the q term
            Dictionary<string, int> NodeMap = new Dictionary<string, int>();
            NodeMap[query] = CurrentNodes;

            //If query is blank assume the user wants to search everything
            if (string.IsNullOrWhiteSpace(query))
            {
                query = "*";
            }

            List<string> NextLevelTerms = new List<string>();
            NextLevelTerms.Add(query);

            //Iterate through the nodes up to 3 levels deep to build the nodes or until max number of nodes is reached
            while ((NextLevelTerms.Count() > 0) && (CurrentLevel <= MaxLevels) && (FDEdgeList.Count() < MaxEdges))
            {
                query = NextLevelTerms.First();
                NextLevelTerms.Remove(query);
                if (NextLevelTerms.Count() == 0)
                {
                    CurrentLevel++;
                }
                DocumentSearchResult response = _searchHelper.GetFacets(query, facetName, 10);
                if(response != null)
                {
                    IList<FacetResult> facetVals = (response.Facets)[facetName];
                    foreach(FacetResult facet in facetVals)
                    {
                        int node = -1;
                        if (NodeMap.TryGetValue(facet.Value.ToString(), out node) == false)
                        {
                            //New node
                            CurrentNodes++;
                            node = CurrentNodes;
                            NodeMap[facet.Value.ToString()] = node;
                        }
                        //Add this facet to the FDEdgeList
                        if(NodeMap[query] != NodeMap[facet.Value.ToString()])
                        {
                            FDEdgeList.Add(new FDGraphEdges
                            {
                                source = NodeMap[query],
                                target = NodeMap[facet.Value.ToString()]
                            });
                            if(CurrentLevel < MaxLevels)
                            {
                                NextLevelTerms.Add(facet.Value.ToString());
                            }
                        }
                    }
                }
            }
            JArray nodes = new JArray();
            foreach (KeyValuePair<string, int> entry in NodeMap)
            {
                nodes.Add(JObject.Parse("{name: " + entry.Key.Replace("\"", "") + "\"}"));
            }

            JArray edges = new JArray();
            foreach (FDGraphEdges entry in FDEdgeList)
            {
                edges.Add(JObject.Parse("{source: " + entry.source + ", target: " + entry.target + "}"));
            }
            dataset.Add(new JProperty("edges", edges));
            dataset.Add(new JProperty("nodes", nodes));

            return dataset;
        }
        
        public class FDGraphEdges
        {
            public int source { get; set; }
            public int target { get; set; }
        }
    }
}
