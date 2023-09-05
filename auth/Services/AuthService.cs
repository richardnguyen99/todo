using Microsoft.Extensions.Caching.Distributed;
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
    private readonly IDistributedCache _cache;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AuthService(
        IAuthRepository authRepository,
        ILogger<AuthService> logger,
        ITokenService tokenService,
        IDistributedCache cache,
        IHttpContextAccessor httpContextAccessor)
    {
        _authRepository = authRepository;
        _logger = logger;
        _tokenService = tokenService;
        _cache = cache;
        _httpContextAccessor = httpContextAccessor;
    }

    public override Task<LoginResponse> Login(LoginRequest request, ServerCallContext context)
    {
        var result = _authRepository.LoginUserAsync(request);


        if (result.Result == null)
        {
            return Task.FromResult(new LoginResponse
            {
                // Return 401 meaning that the request has not been applied
                // because it lacks valid authentication credentials for the
                // target resource.
                AccessToken = string.Empty,
                RefreshToken = string.Empty,
                Message = "Invalid credentials",
                StatusCode = 401
            });
        }

        _logger.LogInformation(message:
            "User founded with email: {}", result.Result.Email);

        var accessToken = _tokenService.CreateAccessToken(result.Result);
        var refreshToken = _tokenService.CreateRefreshToken(result.Result);

        _cache.Remove(result.Result.Email);
        _cache.SetString(result.Result.Email, refreshToken);

        _logger.LogInformation(message:
            "User logged in\nToken: {}", accessToken);

        return Task.FromResult(new LoginResponse
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            Message = "Login successful",
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
                Message = "Unavailable email",
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

        return Task.FromResult(new RegisterResponse
        {
            Message = "User registered successfully",
            StatusCode = 201
        });
    }

    public override Task<ValidateTokenResponse> ValidateToken(
        ValidateTokenRequest request,
        ServerCallContext context)
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
