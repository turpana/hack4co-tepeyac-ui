using Clinica.API.Models;

namespace Clinica.API.Repository
{
    public class UserRepository : Repository<User>
    {
        public UserRepository(IMongoDatabaseProvider databaseProvider)
            : base(databaseProvider, "Users")
        {
        }
    }
}