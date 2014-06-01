using MongoDB.Driver;

namespace Clinical.API.Repository
{
    public interface IMongoDatabaseProvider
    {
        MongoDatabase GetDatabase();
    }
}