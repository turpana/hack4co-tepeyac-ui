using System;
using System.Globalization;
using MongoDB.Bson.Serialization.Attributes;

namespace Clinica.API.Models
{
    public class Goal : Entity
    {
        [BsonIgnoreIfNull]
        public string Description { get; set; }

        [BsonIgnoreIfNull]
        public string Category { get; set; }

        [BsonIgnoreIfNull]
        public string Title { get; set; }

        [BsonIgnoreIfNull]
        public string TextMessage { get; set; }

        [BsonIgnoreIfNull]
        public string Liklihood { get; set; }

        public bool IsActive { get; set; }

        public Goal()
        {
            this.IsActive = true;
            this.Created = DateTime.Now.ToUniversalTime().ToString(CultureInfo.InvariantCulture);
            this.Updated = DateTime.Now.ToUniversalTime().ToString(CultureInfo.InvariantCulture);
        }
    }
}