namespace Clinical.API.Models
{
    public interface IEntity
    {
        string Id { get; set; }
        
        string Updated { get; set; }

        string Created { get; set; }
    }
}