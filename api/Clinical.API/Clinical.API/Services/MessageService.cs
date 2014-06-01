using System.Configuration;
using System.Globalization;
using Clinical.API.Extensions;
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

        //public string SendMessage(Message message, string callBack = "")
        public string SendMessage(Message message)
        {
            var sentMessage = _client.SendSmsMessage(
                message.From,
                message.To,
                message.Body);

            return sentMessage.Sid;
        }

        public Message GetMessage(string smsSid)
        {
            var tMessage = _client.GetMessage(smsSid);

            var message =
                new Message
                {
                    SmsSid = tMessage.Sid,
                    MessageSid = tMessage.Sid,
                    DateReceived =
                        tMessage.DateCreated.ToUnixTimestamp()
                                .ToString(CultureInfo.InvariantCulture),
                };

            return message;
        }
    }
}