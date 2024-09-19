using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository(StoreContext context) : IUserRepository
    {
        public void AddUser(User user)
        {
            context.Users.Add(user);
        }

        public void DeleteUser(User user)
        {
            context.Users.Remove(user);
        }

        public async Task<User> GetUserByUsername(string username)
        {
            return await context.Users
            .Include(x=>x.userAddress)
            .Where(x => x.UserName == username)
            .FirstOrDefaultAsync();
        }

        public void UpdateUser(User user)
        {
            context.Users.Update(user);
        }
    }
}