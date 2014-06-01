using System.Configuration;
using Twilio;
using Message = Clinical.API.Models.Message;

namespace Clinical.API.Services
{
    public class MessageService : IMessageService
    {
        private readonly string _apiSid;
        private readonly string _apiKey;
        private readonly TwilioRestClient _client;

        public MessageService()
        {
            _apiSid = ConfigurationManager.AppSettings["SmsSid"];
            _apiKey = ConfigurationManager.AppSettings["SmsAPIKey"];

            _client = new TwilioRestClient(_apiSid, _apiKey);
        }

        public string SendMessage(Message message)
        {
            var sentMessage = _client.SendSmsMessage(
                message.From, 
                message.To, 
                message.Body);

            return sentMessage.Sid;
        }
    }
}