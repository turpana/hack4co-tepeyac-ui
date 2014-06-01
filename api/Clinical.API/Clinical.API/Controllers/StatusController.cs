//using System;
//using System.Globalization;
//using System.Net;
//using System.Net.Http;
//using System.Web.Http;
//using Clinical.API.Extensions;
//using Clinical.API.Models;
//using Clinical.API.Repository;

//namespace Clinical.API.Controllers
//{
//    public class StatusController : ApiController
//    {
//        private readonly MessageRepository _messageRepository; 

//        public StatusController(MessageRepository messageRepository)
//        {
//            _messageRepository = messageRepository;
//        }

//        public HttpResponseMessage Post(Message message)
//        {
//            if(message != null)
//            {
//                var foundMessage = _messageRepository.GetBySmsId(message.SmsSid) ??
//                                   _messageRepository.Add(message);

//                foundMessage.DateReceived =
//                    DateTime.Now.ToUnixTimestamp().ToString(CultureInfo.InvariantCulture);

//                foundMessage.ReceivedMessage = message.Body + "From Status";
//                foundMessage.SmsSid = message.SmsSid;

//                _messageRepository.Update(foundMessage);
//            }

//            var response = Request.CreateResponse(HttpStatusCode.OK);

//            return response;
//        }
//    }
//}