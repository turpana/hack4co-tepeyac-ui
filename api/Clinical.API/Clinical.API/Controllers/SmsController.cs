using System;
using System.Globalization;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Http;
using Clinical.API.Extensions;
using Clinical.API.Repository;
using Message = Clinical.API.Models.Message;

namespace Clinical.API.Controllers
{
    public class SmsController : ApiController
    {
        private readonly MessageRepository _messageRepository;

        public SmsController(MessageRepository messageRepository)
        {
            _messageRepository = messageRepository;
        }

        public HttpResponseMessage Post([FromUri] Message receivedMessage)
        {
            if(receivedMessage != null)
            {
                var foundMessage = _messageRepository.GetBySmsId(receivedMessage.SmsSid) ??
                                   _messageRepository.Add(receivedMessage);

                foundMessage.DateReceived = 
                    DateTime.Now.ToUnixTimestamp().ToString(CultureInfo.InvariantCulture);

                _messageRepository.Update(foundMessage);
            }

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
                        Content = httpContent
                    };

            return response;
        }
    }
}