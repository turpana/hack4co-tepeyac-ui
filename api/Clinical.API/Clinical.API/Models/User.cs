using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Clinical.API.Models
{
    public class User : Entity
    {
        [BsonIgnoreIfNull]
        public string Email { get; set; }

        [BsonIgnoreIfNull]
        [StringLength(128, MinimumLength = 8)]
        public string Password { get; set; }
        
        [Required]
        [BsonIgnoreIfNull]
        public string FirstName { get; set; }

        [Required]
        [BsonIgnoreIfNull]
        public string LastName { get; set; }

        [BsonIgnoreIfNull]
        [Required]
        public string PhoneNumber { get; set; }
    }
}