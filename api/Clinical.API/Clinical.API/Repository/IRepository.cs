using System.Collections.Generic;

namespace Clinical.API.Repository
{
    public interface IRepository<T>
    {
        T Add(T entity);
        T Update(T entity);
        T GetById(string id);
        T Delete(T entity);
        IEnumerable<T> GetAll();
        IEnumerable<T> GetAllByAccountId(string id);
    }
}