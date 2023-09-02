using Grpc.Core;
using GrpcAuth;

using auth.Controllers;

namespace auth.Services;

#region "authentication service"
public class AuthService : Auth.AuthBase
{
    private readonly ILogger<AuthService> _logger;

    private readonly IAuthController _authController;

    public AuthService(IAuthController authController, ILogger<AuthService> logger)
    {
        _authController = authController;
        _logger = logger;
    }

    public override Task<LoginResponse> Login(LoginRequest request, ServerCallContext context)
    {
        var result = _authController.LoginUserAsync(request);

        return Task.FromResult(new LoginResponse
        {
            Token = $"token {result.Result}",
            Message = "message",
            StatusCode = 200
        });
    }

    public override Task<RegisterResponse> Register(RegisterRequest request, ServerCallContext context)
    {


        return Task.FromResult(new RegisterResponse
        {
            Message = "message",
            StatusCode = 201
        });
    }
}
#endregion
