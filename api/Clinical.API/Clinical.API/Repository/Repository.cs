using System.Collections.Generic;
using System.Linq;
using Clinical.API.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Clinical.API.Repository
{
    public class Repository<T> : IRepository<T> where T : class, IEntity, new()
    {
        public MongoCollection<T> Collection { get; private set; }

        public Repository(IMongoDatabaseProvider databaseProvider, string collectionName)
        {
            this.Collection = databaseProvider.GetDatabase().GetCollection<T>(collectionName);
        }

        public T Add(T entity)
        {
            var currentEntity = this.GetById(entity.Id);

            if(currentEntity == null)
            {
                this.Collection.Save(entity);
            }

            return entity;
        }

        public T Update(T entity)
        {
            this.Collection.Save(entity);

            return entity;
        }

        public T GetById(string id)
        {
            if(string.IsNullOrEmpty(id))
            {
                return default(T);
            }

            var query =
                new QueryDocument
                    {
                        {"_id", new BsonObjectId(new ObjectId(id))}
                    };

            return this.Collection.Find(query).FirstOrDefault();
        }

        public IEnumerable<T> GetAll()
        {
            return this.Collection.FindAll();
        }

        public IEnumerable<T> GetAllByAccountId(string accountId)
        {
            var query =
                new QueryDocument
                    {
                        {"accountId", accountId}
                    };

            return this.Collection.Find(query);
        }
    }
}