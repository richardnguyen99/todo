using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

using auth.Models;

namespace auth.Controllers;

[Route("[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    public UserController()
    {
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var users = Enumerable.Range(1, 5).Select(
            user => new User
            {
                UserName = $"User{user}",
                Password = $"Password{user}",
                Email = $"email{user}@example.com",
                LastName = $"LastName: {user}",
                FirstName = $"FirstName: {user}"
            }
        );

        return Ok(users);
    }
}
