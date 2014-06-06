using Clinica.API.Models;

namespace Clinica.API.Services
{
    public interface IMessageService
    {
        //string SendMessage(Message message, string callBack = "");
        string SendMessage(Message message);
        Message GetMessage(string smsSid);
    }
}