using System.Configuration;
using System.Globalization;
using Clinica.API.Extensions;
using Twilio;
using Message = Clinica.API.Models.Message;

namespace Clinica.API.Services
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