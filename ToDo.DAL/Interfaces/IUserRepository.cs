using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ToDo.DAL.Entities;

namespace ToDo.DAL.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        User GetUserByEmail(string email);
    }
}
