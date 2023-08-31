using Grpc.Core;
using GrpcAuth;

namespace auth.Services;

#region "authentication service"
public class AuthService : Auth.AuthBase
{
    private readonly ILogger<AuthService> _logger;
    public AuthService(ILogger<AuthService> logger)
    {
        _logger = logger;
    }

    public override Task<LoginResponse> Login(LoginRequest request, ServerCallContext context)
    {
        Console.WriteLine($"Login request received: {request.Email} {request.Password}");

        return Task.FromResult(new LoginResponse
        {
            Token = "token",
            Message = "message",
            StatusCode = 200
        });
    }
}
#endregion
