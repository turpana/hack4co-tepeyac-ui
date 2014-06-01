using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Clinical.API.Models;
using Clinical.API.Repository;

namespace Clinical.API.Controllers
{
    public class UserController : ApiController
    {
        private readonly IRepository<User> _userRepository;
        private readonly GoalRepository _goalRepository;

        public UserController(IRepository<User> userRepository, GoalRepository goalRepository)
        {
            _userRepository = userRepository;
            _goalRepository = goalRepository;
        }

        [HttpGet]
        public HttpResponseMessage Get()
        {
            var user = _userRepository.GetAll();

            var response = Request.CreateResponse(HttpStatusCode.OK, user);

            return response;
        }

        [HttpGet]
        public HttpResponseMessage GetUserById(string id)
        {
            if(string.IsNullOrEmpty(id))
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }

            var user = _userRepository.GetById(id);

            var response = Request.CreateResponse(HttpStatusCode.OK, user);

            return response;
        }

        [HttpGet]
        [ActionName("goal")]
        public HttpResponseMessage GetGoalsById(string userId, string goalId = "")
        {
            if(string.IsNullOrEmpty(userId))
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }

            var goals = _goalRepository.GetGoalsByUserId(userId);

            var response = Request.CreateResponse(HttpStatusCode.OK, goals);

            return response;
        }

        public HttpResponseMessage Post(User user)
        {
            if(!string.IsNullOrEmpty(user.Id))
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }

            _userRepository.Add(user);

            var response = Request.CreateResponse(HttpStatusCode.Created, user);

            string uri = Url.Link("DefaultApi", new { id = user.Id });
            response.Headers.Location = new Uri(uri);

            return response;
        }
    }
}