using System.Collections.Generic;
using System.Linq;
using Clinical.API.Models;
using MongoDB.Driver;
using MongoDB.Driver.Builders;

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

        public Message GetMostRecent(string fromPhoneNumber)
        {
            var query =
                Query.Or(
                    new QueryDocument
                        {
                            { "from", fromPhoneNumber}
                        },
                    new QueryDocument
                        {
                            { "from", "+1" + fromPhoneNumber}
                        });

            var sortBy = SortBy.Descending("created");

            var mostRecent = this.Collection.Find(query).SetSortOrder(sortBy).FirstOrDefault();

            return mostRecent;
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