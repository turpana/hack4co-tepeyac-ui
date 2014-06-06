using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Clinica.API.Models;
using Clinica.API.Repository;
using Clinica.API.Services;

namespace Clinica.API.Controllers
{
    public class MessageController : ApiController
    {
        private readonly IMessageService _messageService;
        private readonly IRepository<Message> _messages;

        public MessageController(
            IMessageService messageService,
            IRepository<Message> messages)
        {
            _messageService = messageService;
            _messages = messages;
        }

        public HttpResponseMessage Post(Message message)
        {
            string seed = Guid.NewGuid().ToString().Substring(0, 4).ToLower();

            message.Seed = seed;
            var oldBody = message.Body;

            message.Body = "You must you this code when replying: " + seed + "\n\n" + message.Body;

            if (string.IsNullOrEmpty(message.MessageStatus))
            {
                _messageService.SendMessage(message);
            }

            var response = Request.CreateResponse(HttpStatusCode.Created);

            message.Body = oldBody;

            _messages.Add(message);

            return response;
        }

        public HttpResponseMessage Get()
        {
            return Request.CreateResponse(HttpStatusCode.OK, new Message());
        }
    }
}