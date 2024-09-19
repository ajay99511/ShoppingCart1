using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        public void AddUser (User user);
        public void DeleteUser (User user);
        public void UpdateUser (User user);
        public Task<User> GetUserByUsername (string username);
    }
}