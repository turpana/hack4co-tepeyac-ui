using MongoDB.Driver;

namespace Clinica.API.Repository
{
    public interface IMongoDatabaseProvider
    {
        MongoDatabase GetDatabase();
    }
}