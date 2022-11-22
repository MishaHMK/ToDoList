using System;
using System.Collections.Generic;
using System.Text;
using ToDo.DAL.Entities;

namespace ToDo.DAL.Interfaces
{
    public interface IJWTManagerRepository
    {
        Token Authenticate(User user, ICollection<User> usersRecords);
    }
}
