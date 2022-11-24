using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ToDo.DAL.Entities;

namespace ToDo.BLL.Interfaces
{
    public interface IUserService
    {
        Task<ICollection<User>> GetAllUsersAsync();

        Task<User> GetUserByIdAsync(int objectId);

        Task<User> GetUserByEmailAsync(string email);

        Task CreateUser(User user);

        Task DeleteUserById(int id);
    }
}
