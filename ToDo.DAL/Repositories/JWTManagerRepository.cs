using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using ToDo.DAL.Entities;
using ToDo.DAL.Interfaces;

namespace ToDo.DAL.Repositories
{
    public class JWTManagerRepository : IJWTManagerRepository
    {
        private readonly IConfiguration _iconfiguration;
        public JWTManagerRepository(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
        }

        public Token Authenticate(User user, ICollection<User> usersRecords)
        {
            if (!usersRecords.Any(x => x.Name == user.Name && x.Password == user.Password))
            {
                return null;
            }

            // Generate JSON Web Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.UTF8.GetBytes(_iconfiguration["JWT:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
              {
             new Claim(ClaimTypes.Name, user.Name)
              }),
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return new Token { TokenString = tokenHandler.WriteToken(token) };

        }
    }
}
