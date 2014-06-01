using System.Collections.Generic;
using Clinical.API.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Clinical.API.Repository
{
    public class GoalRepository : Repository<Goal>
    {
        public GoalRepository(IMongoDatabaseProvider databaseProvider)
            : base(databaseProvider, "Goals")
        {
        }

        public IEnumerable<Goal> GetGoalsByUserId(string userId)
        {
            var query =
                new QueryDocument
                    {
                        { "accountId", userId }
                    };

            return this.Collection.Find(query);
        }
    }
}