using Grpc.Core;
using GrpcAuth;

using auth.Repositories;
using auth.Models;

namespace auth.Services;

#region "authentication service"
public class AuthService : Auth.AuthBase
{
    private readonly ILogger<AuthService> _logger;

    private readonly IAuthRepository _authRepository;

    private readonly ITokenService _tokenService;

    public AuthService(IAuthRepository authRepository, ILogger<AuthService> logger, ITokenService tokenService)
    {
        _authRepository = authRepository;
        _logger = logger;
        _tokenService = tokenService;
    }

    public override Task<LoginResponse> Login(LoginRequest request, ServerCallContext context)
    {
        var result = _authRepository.LoginUserAsync(request);

        return Task.FromResult(new LoginResponse
        {
            Token = $"token {result.Result}",
            Message = "message",
            StatusCode = 200
        });
    }

    public override Task<RegisterResponse> Register(RegisterRequest request, ServerCallContext context)
    {
        var result = _authRepository.GetUserByEmailAsync(request.Email);

        if (result.Result)
        {
            return Task.FromResult(new RegisterResponse
            {
                // Return 200 meaning that the request was processed 
                // successfully but the email has already been used.
                Message = "This email has already been used",
                StatusCode = 200
            });
        }

        var salt = BCrypt.Net.BCrypt.GenerateSalt(12);
        var hashedPassword = BCrypt.Net
                    .BCrypt
                    .HashPassword(request.Password, salt);

        var newUserInfo = new UserInfo
        {
            Username = request.Username,
            Email = request.Email,
            Password = hashedPassword
        };

        result = _authRepository.InsertNewUserAsync(newUserInfo);

        if (!result.Result)
        {
            return Task.FromResult(new RegisterResponse
            {
                // Return 500 meaning that there was an internal server error,
                // meaning that the server understood the request but could not
                // fulfill it.
                Message = "Internal Server Error",
                StatusCode = 500
            });
        }


        var token = _tokenService.CreateToken(newUserInfo);

        _logger.LogInformation(message: "User registered\nToken: {}", token);

        return Task.FromResult(new RegisterResponse
        {
            Token = $"{token}",
            Message = "User registered successfully",
            StatusCode = 201
        });
    }

    public override Task<ValidateTokenResponse> ValidateToken(ValidateTokenRequest request, ServerCallContext context)
    {
        // var result = _tokenService.ValidateToken(request.Token);

        return Task.FromResult(new ValidateTokenResponse
        {
            Message = "message",
            StatusCode = 200
        });
    }
}

#endregion
