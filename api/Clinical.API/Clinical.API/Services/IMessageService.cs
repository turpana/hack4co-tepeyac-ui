using Clinical.API.Models;

namespace Clinical.API.Services
{
    public interface IMessageService
    {
        string SendMessage(Message message);
    }
}