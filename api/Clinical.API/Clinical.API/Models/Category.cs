using MongoDB.Bson.Serialization.Attributes;

namespace Clinical.API.Models
{
    public class Category : Entity
    {
        [BsonIgnoreIfNull]
        public string Title { get; set; }

        [BsonIgnoreIfNull]
        public string ReminderMessage { get; set; }

        [BsonIgnoreIfNull]
        public string Status { get; set; }
    }
}