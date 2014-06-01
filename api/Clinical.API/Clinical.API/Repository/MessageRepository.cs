using System.Collections.Generic;
using System.Linq;
using Clinical.API.Models;
using MongoDB.Driver;

namespace Clinical.API.Repository
{
    public class MessageRepository : Repository<Message>
    {
        public MessageRepository(IMongoDatabaseProvider databaseProvider)
            : base(databaseProvider, "Messages")
        {
        }

        public Message GetBySmsId(string smsId)
        {
            if(string.IsNullOrEmpty(smsId))
            {
                return null;
            }

            var query =
                new QueryDocument
                    {
                        {"smsSid", smsId}
                    };

            return base.Collection.Find(query).FirstOrDefault();
        }

        public IEnumerable<Message> GetMessageByGoalId(string goalId)
        {
            if(string.IsNullOrEmpty(goalId))
            {
                return null;
            }

            var query =
                new QueryDocument
                    {
                        {"goalId", goalId}
                    };

            return base.Collection.Find(query);
        }
    }
}