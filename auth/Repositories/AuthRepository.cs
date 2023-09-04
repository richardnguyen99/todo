using Microsoft.EntityFrameworkCore;
using GrpcAuth;
using auth.Data;
using auth.Models;

namespace auth.Repositories;

#region "authentication repository"

public class AuthRepository : IAuthRepository
{
    private readonly UserInfoContext _context;
    private readonly ILogger<AuthRepository> _logger;

    public AuthRepository(
        UserInfoContext context, ILogger<AuthRepository> logger)
    {
        _logger = logger;
        _context = context;
    }

    public async Task<bool> GetUserByEmailAsync(string email)
    {
        try
        {
            string result = await _context.UserInfos
                .Where(x => x.Email == email)
                .Select(x => x.Email).FirstAsync();

            return true;

        }
        catch (Exception e)
        {
            _logger.LogError("{Message}", e.Message);
            return false;
        }

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

    public async Task<bool> InsertNewUserAsync(UserInfo newUser)
    {
        try
        {
            await _context.UserInfos.AddAsync(newUser);
            await _context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            _logger.LogError("{Message}", e.Message);
            return false;
        }

        return true;
    }
};

#endregion
