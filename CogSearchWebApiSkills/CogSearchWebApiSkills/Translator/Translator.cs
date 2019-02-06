using System.Net.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text;

/*
 * Author: Karl Roth
 * 
 */ 

namespace CogSearchWebApiSkills.TranslatorSkill
{
    // This class will simply translate messages sent to it.
    public class Translator
    {
        /// <summary>
        /// Use Cognitive Service to translate text from one language to antoher.
        /// </summary>
        /// <param name="myText">The text to translate</param>
        /// <param name="destinationLanguage">The language you want to translate to.</param>
        /// <returns>Asynchronous task that returns the translated text. </returns>
        public async static Task<string> TranslateText(string myText, string destinationLanguage)
        {
            string host = "https://api.microsofttranslator.com";
            string path = "/V2/Http.svc/Translate";

            // NOTE: Replace this example key with a valid subscription key.
            string key = "[Subscription Key]";

            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", key);

            List<KeyValuePair<string, string>> list = new List<KeyValuePair<string, string>>() {
                new KeyValuePair<string, string>(myText, "en-us")
            };

            StringBuilder totalResult = new StringBuilder();

            foreach (KeyValuePair<string, string> i in list)
            {
                string uri = host + path + "?to=" + i.Value + "&text=" + System.Net.WebUtility.UrlEncode(i.Key);

                HttpResponseMessage response = await client.GetAsync(uri);

                string result = await response.Content.ReadAsStringAsync();

                // Parse the response XML
                System.Xml.XmlDocument xmlResponse = new System.Xml.XmlDocument();
                xmlResponse.LoadXml(result);
                totalResult.Append(xmlResponse.InnerText);
            }

            return totalResult.ToString();

        }
    }
}