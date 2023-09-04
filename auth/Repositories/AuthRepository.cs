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

    public async Task<UserInfo?> LoginUserAsync(LoginRequest request)
    {
        var result = await _context.UserInfos
            .Where(x => x.Email == request.Email)
            .Select(u => new UserInfo
            {
                Email = u.Email,
                Password = u.Password
            }).FirstOrDefaultAsync();

        if (result == null)
        {
            return null;
        }

        if (!VerifyPassword(request.Password, result.Password))
        {
            return null;
        }

        return result;

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

    private static string HashPassword(string password)
    {
        var salt = BCrypt.Net.BCrypt.GenerateSalt(12);
        return BCrypt.Net.BCrypt.HashPassword(password, salt);
    }

    private static bool VerifyPassword(string password, string hashedPassword)
    {
        return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
    }
};

#endregion
