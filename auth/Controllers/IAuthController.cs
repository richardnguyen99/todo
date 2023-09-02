using GrpcAuth;

namespace auth.Controllers;

#region "authentication controller"

public interface IAuthController
{
    Task<bool> LoginUserAsync(LoginRequest request);
    Task<bool> RegisterUserAsync(RegisterRequest request);
};

#endregion
