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
            string indexName = String.IsNullOrEmpty(req.Headers["IndexName"]) ? keys.
        }
    }
}
