using System.Collections.Generic;
using System.Linq;
using Clinica.API.Models;
using MongoDB.Driver;
using MongoDB.Driver.Builders;

namespace Clinica.API.Repository
{
    public class MessageRepository : Repository<Message>
    {
        public MessageRepository(IMongoDatabaseProvider databaseProvider)
            : base(databaseProvider, "Messages")
        {
        }

        public Message GetBySmsId(string smsId)
        {
            if (string.IsNullOrEmpty(smsId))
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

        public Message GetMessageBySeed(string seed)
        {
            var query = Query.EQ("seed", seed.ToLower());

            var message = this.Collection.Find(query);

            return message.FirstOrDefault();
        }

        public IEnumerable<Message> GetMessageByGoalId(string goalId)
        {
            if (string.IsNullOrEmpty(goalId))
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