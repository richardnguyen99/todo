using GrpcAuth;
using auth.Models;

namespace auth.Repositories;

#region "authentication repository"
public interface IAuthRepository
{
    Task<UserInfo?> LoginUserAsync(LoginRequest request);
    Task<bool> RegisterUserAsync(RegisterRequest request);

    Task<bool> GetUserByEmailAsync(string email);

    Task<bool> InsertNewUserAsync(UserInfo newUser);
};

#endregion
