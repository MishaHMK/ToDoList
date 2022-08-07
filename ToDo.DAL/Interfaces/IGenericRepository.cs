using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ToDo.DAL.Interfaces
{
    public interface IGenericRepository <T> where T : class
    {
        Task<ICollection<T>> GetAll();

        Task<T> GetById(int id);

        Task Create(T entity);

        Task Update(T entity);

        Task Delete(int id);
    }
}
