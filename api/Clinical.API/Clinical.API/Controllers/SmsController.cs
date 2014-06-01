using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Http;
using Clinical.API.Repository;
using Clinical.API.Services;
using Message = Clinical.API.Models.Message;

namespace Clinical.API.Controllers
{
    public class SmsController : ApiController
    {
        private readonly MessageRepository _messageRepository;
        private readonly IMessageService _messageService;

        public SmsController(MessageRepository messageRepository, IMessageService messageService)
        {
            _messageRepository = messageRepository;
            _messageService = messageService;
        }

        public HttpResponseMessage Post([FromUri] Message receivedMessage)
        {
            //Find the most recent message, if this matches, 
            //it means the user has responded to the correct one
            //otherwise no action is taken.
            var mostRecent = _messageRepository.GetMostRecent(receivedMessage.From);

            //Already replied to this message, bail.
            if (mostRecent == null || !string.IsNullOrEmpty(mostRecent.ReceivedMessage))
            {
                return Request.CreateResponse(HttpStatusCode.OK);
            }

            var foundMessage = _messageService.GetMessage(receivedMessage.SmsSid);

            //Not the latest, bail.
            if (String.CompareOrdinal(foundMessage.DateReceived, mostRecent.DateReceived) < 0)
            {
                return Request.CreateResponse(HttpStatusCode.OK);
            }

            //This is most likely the most recent message, save the reply
            receivedMessage.ReceivedMessage = receivedMessage.Body;
            receivedMessage.Body = mostRecent.Body;

            _messageRepository.Update(receivedMessage);


            //var messageId = string.Empty;

            ////TODO: The SmsSid does not match the one that was sent.
            //if (receivedMessage != null)
            //{
            //    var foundMessage = _messageRepository.GetById(messageId);

            //    receivedMessage.DateReceived =
            //        DateTime.Now.ToUnixTimestamp().ToString(CultureInfo.InvariantCulture);
            //    receivedMessage.ReceivedMessage = receivedMessage.Body;
            //    receivedMessage.Body = foundMessage.Body;

            //    //receivedMessage.ReceivedMessage = receivedMessage.Body + "From SMS";
            //    //foundMessage.SmsSid = receivedMessage.SmsSid;

            //    //Add the message with the most information
            //    _messageRepository.Update(receivedMessage);

            //    //Remove the old message
            //    _messageRepository.Delete(foundMessage);
            //}

            const string xml =
                "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
                + "<Response>"
                + "<Message>{0}</Message>"
                + "</Response>";
            const string message = "Thanks for the response!";

            var httpContent =
                new StringContent(
                    string.Format(xml, message), Encoding.UTF8, "text/xml");
            httpContent.Headers.ContentType = new MediaTypeHeaderValue("text/xml");

            var response =
                new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = httpContent,
                };

            return response;
        }
    }
}