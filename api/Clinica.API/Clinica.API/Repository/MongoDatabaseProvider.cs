using System.Configuration;
using MongoDB.Driver;

namespace Clinica.API.Repository
{
    public class MongoDatabaseProvider : IMongoDatabaseProvider
    {

        private readonly MongoDatabase _database;

        public MongoDatabaseProvider()
        {
            var uri = ConfigurationManager.ConnectionStrings["MongoDB"].ConnectionString;
            var client = new MongoClient(uri);
            _database = client.GetServer().GetDatabase(new MongoUrl(uri).DatabaseName);
        }

        public MongoDatabase GetDatabase()
        {
            return _database;
        }
    }
}