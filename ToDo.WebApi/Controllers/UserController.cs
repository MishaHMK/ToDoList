#pragma warning disable CS1998
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToDo.BLL.Interfaces;
using ToDo.DAL.Entities;
using ToDo.DAL.Interfaces;
using ToDo.WebApi.DTOs;
using ToDoWebApi.DTOs;

namespace ToDo.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IJWTManagerRepository _jWTManager;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UserController(IJWTManagerRepository jWTManager, IUserService userService, IMapper mapper)
        {
            _jWTManager = jWTManager;
            _userService = userService;
            _mapper = mapper;   
        }


        // GET: api/User
        [HttpGet]
        public async Task<ActionResult> GetUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            var userDTOs = _mapper.Map<List<UserDTO>>(users);

            return Ok(userDTOs);
        }

        // GET: api/User/email
        [HttpPost]
        [Route("email")]
        public async Task<ActionResult> GetUserByEmail(EmailDTO emailDTO)
        {
            var user = await _userService.GetUserByEmailAsync(emailDTO.Email);
            var userDTO = _mapper.Map<UserDTO>(user);

            return Ok(userDTO);
        }

        // GET: api/User/1
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);

            if (user != null)
            {
                var userDTO = _mapper.Map<UserDTO>(user);
                return Ok(userDTO);
            }
            else return NotFound();
        }

        // POST: api/User
        [HttpPost]
        public async Task<ActionResult> PostUser(UserDTO userDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = _mapper.Map<User>(userDTO);
            await _userService.CreateUser(user);

            return CreatedAtAction("PostUser", new { id = user.Id }, user);
        }

        // DELETE: api/User/1
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUserById(int id)
        {
            await _userService.DeleteUserById(id);
            return Ok();
        }

        // GET: api/User/authenticate
        [AllowAnonymous]
        [HttpPost]
        [Route("authenticate")]
        public async Task<ActionResult> Authenticate(User usersdata)
        {
            var users = await _userService.GetAllUsersAsync();

            var token = _jWTManager.Authenticate(usersdata, users);

            if (token == null)
            {
                return Unauthorized();
            }

            return Ok(token);
        }
    }
}
