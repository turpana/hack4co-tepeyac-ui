using System.Net;
using System.Net.Http;
using System.Web.Http;
using Clinical.API.Models;
using Clinical.API.Repository;

namespace Clinical.API.Controllers
{
    public class GoalController : ApiController
    {
        private readonly IRepository<Goal> _goalsRepository;
        private readonly MessageRepository _messageRepository;

        public GoalController(IRepository<Goal> goalsRepository, MessageRepository messageRepository)
        {
            _goalsRepository = goalsRepository;
            _messageRepository = messageRepository;
        }

        public HttpResponseMessage Get()
        {
            var goals = _goalsRepository.GetAll();

            var response = Request.CreateResponse(HttpStatusCode.OK, goals);

            return response;
        }

        public HttpResponseMessage GetGoalById(string id)
        {
            if(string.IsNullOrEmpty(id))
            {
                return Request.CreateResponse(HttpStatusCode.OK, new Goal());
            }

            var goal = _goalsRepository.GetById(id);

            var response = Request.CreateResponse(HttpStatusCode.OK, goal);

            return response;
        }

        [HttpGet]
        [ActionName("message")]
        public HttpResponseMessage GetMessagesByGoal(string goalId, string messageId = "")
        {
            if(string.IsNullOrEmpty(goalId))
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }

            var goals = _messageRepository.GetMessageByGoalId(goalId);

            var response = Request.CreateResponse(HttpStatusCode.OK, goals);

            return response;
        }

        public HttpResponseMessage Post(Goal goal)
        {
            if(!string.IsNullOrEmpty(goal.Id))
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }

            _goalsRepository.Add(goal);

            var response = Request.CreateResponse(HttpStatusCode.Created);

            return response;
        }
    }
}