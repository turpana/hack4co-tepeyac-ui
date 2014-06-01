using System.Net;
using System.Net.Http;
using System.Web.Http;
using Clinical.API.Models;
using Clinical.API.Repository;
using Clinical.API.Services;

namespace Clinical.API.Controllers
{
    public class MessageController : ApiController
    {
        private readonly IMessageService _messageService;
        private readonly IRepository<Message> _messages;

        public MessageController(IMessageService messageService, IRepository<Message> messages)
        {
            _messageService = messageService;
            _messages = messages;
        }

        public HttpResponseMessage Post(Message message)
        {
            //string callBack = Url.Link("DefaultApi",
            //    new
            //        {
            //            controller= "status",
            //            goalId = message.GoalId ?? ""
            //        });

            var smsSid = _messageService.SendMessage(message);

            var response = Request.CreateResponse(HttpStatusCode.Created, smsSid);

            _messages.Add(message);

            return response;
        }

        public HttpResponseMessage Get()
        {
            return Request.CreateResponse(HttpStatusCode.OK, new Message());
        }
    }
}