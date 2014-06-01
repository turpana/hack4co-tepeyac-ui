using MongoDB.Bson.Serialization.Attributes;

namespace Clinical.API.Models
{
    public class Message : SmsMessage
    {
        //[Required]
        public string GoalId { get; set; }

        /// <summary>
        /// 
        /// This is a UNIX timestamp
        /// 
        /// </summary>
        [BsonIgnoreIfNull]
        public string DateReceived { get; set; }

        [BsonIgnoreIfNull]
        public string ReceivedMessage { get; set; }
    }

    public class SmsMessage : Entity
    {
        [BsonIgnoreIfNull]
        public string MessageSid { get; set; }

        [BsonIgnoreIfNull]
        public string SmsSid { get; set; }

        [BsonIgnoreIfNull]
        public string SmsStatus { get; set; }

        [BsonIgnoreIfNull]
        public string MessageStatus { get; set; }

        [BsonIgnoreIfNull]
        public string AccountSid { get; set; }

        [BsonIgnoreIfNull]
        public string From { get; set; }

        [BsonIgnoreIfNull]
        public string To { get; set; }

        [BsonIgnoreIfNull]
        public string Body { get; set; }

        [BsonIgnoreIfNull]
        public string NumMedia { get; set; }

        [BsonIgnoreIfNull]
        public string FromCity { get; set; }

        [BsonIgnoreIfNull]
        public string FromState { get; set; }

        [BsonIgnoreIfNull]
        public string FromZip { get; set; }

        [BsonIgnoreIfNull]
        public string FromCountry { get; set; }

        [BsonIgnoreIfNull]
        public string ToCity { get; set; }

        [BsonIgnoreIfNull]
        public string ToState { get; set; }

        [BsonIgnoreIfNull]
        public string ToZip { get; set; }

        [BsonIgnoreIfNull]
        public string ToCountry { get; set; }
    }
}