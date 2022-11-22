using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ToDo.BLL.Interfaces;
using ToDo.DAL.Entities;
using ToDo.DAL.Interfaces;

namespace ToDo.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task CreateUser(User user)
        {
            await _unitOfWork.Users.Create(user);
            await _unitOfWork.Save();
        }

        public async Task DeleteUserById(int id)
        {
            await _unitOfWork.Users.Delete(id);
            await _unitOfWork.Save();
        }

        public Task<ICollection<User>> GetAllUsersAsync()
        {
            return _unitOfWork.Users.GetAll();
        }

        public async Task<User> GetUserByIdAsync(int userId)
        {
            return await _unitOfWork.Users.GetById(userId);
        }
    }
}
