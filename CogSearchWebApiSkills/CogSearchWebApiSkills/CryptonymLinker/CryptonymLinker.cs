using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;

namespace CogSearchWebApiSkills.CryptonymLinker
{
    class CryptonymLinker
    {
        public CryptonymLinker(string executingDirectoryPath)
        {
            string json = File.ReadAllText($"{executingDirectoryPath}\\CryptonymLinker\\cryptonyms.json");
            Cryptonyms = new Dictionary<string, string>(JsonConvert.DeserializeObject<Dictionary<string, string>>(json), StringComparer.InvariantCultureIgnoreCase);
        }

        public Dictionary<string, string> Cryptonyms
        {
            get; private set;
        }
    }
}
