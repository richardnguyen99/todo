using GrpcAuth;
using auth.Models;
using Microsoft.EntityFrameworkCore;

namespace auth.Controllers;

#region "authentication controller"

public class AuthController : IAuthController
{
    private readonly UserInfoContext _context;
    private readonly ILogger<AuthController> _logger;

    public AuthController(UserInfoContext context, ILogger<AuthController> logger)
    {
        _logger = logger;
        _context = context;
    }

    public async Task<bool> LoginUserAsync(LoginRequest request)
    {
        string result = await _context.UserInfos
            .Where(x => x.Email == request.Email)
            .Select(x => x.Password).FirstAsync();

        if (result == null)
        {
            return false;
        }

        return result.CompareTo(request.Password) == 0;
    }

    public async Task<bool> RegisterUserAsync(RegisterRequest request)
    {
        var result = await _context.UserInfos.FindAsync(request.Email);

        if (result != null)
        {
            return false;
        }

        return true;
    }
};

#endregion
