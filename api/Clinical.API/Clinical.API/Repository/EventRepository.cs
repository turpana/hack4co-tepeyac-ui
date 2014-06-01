using Clinical.API.Models;

namespace Clinical.API.Repository
{
    public class EventsRepository : Repository<Event>
    {
        public EventsRepository(IMongoDatabaseProvider databaseProvider)
            : base(databaseProvider, "Event")
        {
        }
    }
}