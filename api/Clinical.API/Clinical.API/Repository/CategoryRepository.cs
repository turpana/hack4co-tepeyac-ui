using Clinical.API.Models;

namespace Clinical.API.Repository
{
    public class CategoryRepository : Repository<Category>
    {
        public CategoryRepository(IMongoDatabaseProvider databaseProvider) 
            : base(databaseProvider, "Event")
        {
        }
    }
}