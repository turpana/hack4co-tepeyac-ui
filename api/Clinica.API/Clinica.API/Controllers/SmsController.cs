using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Http;
using Clinica.API.Repository;
using Message = Clinica.API.Models.Message;

namespace Clinica.API.Controllers
{
    public class SmsController : ApiController
    {
        private readonly MessageRepository _messageRepository;

        public SmsController(MessageRepository messageRepository)
        {
            _messageRepository = messageRepository;
        }

        public HttpResponseMessage Post(Message receivedMessage)
        {
            //TODO:  Do this better.
            var tokens = receivedMessage.Body.Split(new[] { " " }, StringSplitOptions.None);
            bool isError = tokens.Length < 2;
            //TODO: Use an Enum
            bool isDupe = false;

            if (!isError)
            {
                var seed = tokens[0];

                var currentMessage = _messageRepository.GetMessageBySeed(seed);

                if (currentMessage == null)
                {
                    isError = true;
                }
                else if (!string.IsNullOrEmpty(currentMessage.ReceivedMessage))
                {
                    isDupe = true;
                }
                else
                {
                    //Set the receivedMessage
                    currentMessage.ReceivedMessage = receivedMessage.Body.Substring(6);

                    //Save the new record
                    _messageRepository.Update(currentMessage);
                }
            }

            const string xml =
                "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
                + "<Response>"
                + "<Message>{0}</Message>"
                + "</Response>";
            const string message = "Thanks for the response!";
            const string erroMessage = "Please resend your message with your 4 character code";
            const string dupeMessage = "Thanks but you've already sent your update.";

            var httpContent =
                new StringContent(
                    string.Format(xml, isDupe ? dupeMessage : isError ? erroMessage : message), Encoding.UTF8, "text/xml");
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