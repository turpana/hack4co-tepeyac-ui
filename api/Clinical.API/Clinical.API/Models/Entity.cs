using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Clinical.API.Models
{
    public class Entity : IEntity
    {
        [BsonRequired]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonIgnoreIfNull]
        public string AccountId { get; set; }

        [BsonIgnoreIfNull]
        public string Updated { get; set; }

        [BsonIgnoreIfNull]
        public string Created { get; set; }
    }
}