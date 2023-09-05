using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

using auth.Models;

namespace auth.Services;


#region "token controller"

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;

    private readonly ILogger<TokenService> _logger;

    public TokenService(ILogger<
        TokenService> logger,
        IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
    }

    public string CreateAccessToken(UserInfo user)
    {
        var expiration = DateTime.UtcNow
                            .AddMinutes(ITokenService.ExpirationTime);

        _logger.LogInformation(message:
            "User founded with email: {}", user.Email);

        try
        {
            JwtSecurityToken token = CreateJwtToken(
                                        CreateClaims(user),
                                        CreateSigningCredentials(),
                                        expiration
                                    );

            _logger.LogInformation(message:
                "Token created: {}", token);

            var tokenHandler = new JwtSecurityTokenHandler();
            var stringToken = tokenHandler.WriteToken(token);

            return stringToken;
        }
        catch (Exception e)
        {
            _logger.LogError("{}.\nToken is empty!", e.Message);
            return string.Empty;
        }
    }

    public string CreateRefreshToken(UserInfo user)
    {
        var refreshToken = Guid.NewGuid().ToString();

        return refreshToken;
    }

    private static JwtSecurityToken CreateJwtToken(
        List<Claim> claims,
        SigningCredentials credentials,
        DateTime expiration)
    {
        try
        {
            var token = new JwtSecurityToken(
                issuer: "https://auth:7135",
                audience: "https://gateway:4444",
                claims: claims,
                expires: expiration,
                signingCredentials: credentials
            );

            return token;
        }
        catch (Exception e)
        {
            throw new ArgumentNullException($"CreateJwtToken: {e.Message}");
        }
    }

    private static List<Claim> CreateClaims(UserInfo user)
    {
        var claims = new List<Claim> {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(
                JwtRegisteredClaimNames.Jti,
                Guid.NewGuid().ToString()
            ),
            new Claim(
                JwtRegisteredClaimNames.Iat,
                DateTime.UtcNow.ToString(CultureInfo.InvariantCulture)
            ),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Email, user.Email),

        };

        return claims;
    }

    private SigningCredentials CreateSigningCredentials()
    {
        var key = _configuration.GetSection("Authentication:Secret").Value;

        if (key == null)
        {
            throw new ArgumentNullException(nameof(key));
        }

        return new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
            SecurityAlgorithms.HmacSha256
        );
    }
};

#endregion
