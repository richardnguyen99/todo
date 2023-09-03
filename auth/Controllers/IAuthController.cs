using GrpcAuth;

using auth.Models;

namespace auth.Controllers;

#region "authentication controller"
public interface IAuthController
{
    Task<bool> LoginUserAsync(LoginRequest request);
    Task<bool> RegisterUserAsync(RegisterRequest request);

    Task<bool> GetUserByEmailAsync(string email);

    Task<bool> InsertNewUserAsync(UserInfo newUser);
};

#endregion
