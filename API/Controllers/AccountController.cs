using System.Formats.Asn1;
using API.DTO;
using API.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;

    public AccountController(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
    }

    [HttpPost("/api/Account")]
    public async Task<IActionResult> Login(LoginDto model)
    {
        var user = await _userManager.FindByNameAsync(model.UserName);

        if (user == null)
        {
            return BadRequest(new { message = "username is wrong" });
        }

        var result = await _userManager.CheckPasswordAsync(user, model.Password);

        if (result)
        {
            return Ok(new { token = "token" });
        }

        return Unauthorized();
    }
}