using Clinical.API.Models;

namespace Clinical.API.Repository
{
    public class UserRepository : Repository<User>
    {
        public UserRepository(IMongoDatabaseProvider databaseProvider)
            : base(databaseProvider, "Users")
        {
        }
    }
}