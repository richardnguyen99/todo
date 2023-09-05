//

using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

using auth.Models;

namespace auth.Services;


#region "token controller"

// Summary:
//    Token service class  to generate JWT tokens for authentication.
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

    public List<string> CreateTokens(UserInfo user, string ipAddress)
    {
        var sessionId = Guid.NewGuid().ToString();

        var accessToken = CreateAccessToken(user, sessionId, ipAddress);
        var refreshToken = CreateRefreshToken(user, sessionId, ipAddress);

        return new List<string> { accessToken, refreshToken };
    }

    public string CreateAccessToken(
        UserInfo user,
        string sessionId,
        string ipAddress)
    {
        var expiration = DateTime.UtcNow.AddMinutes(
            ITokenService.AccessTokenExpirationTime
        );

        _logger.LogInformation(message:
            "User founded with email: {}", user.Email);

        try
        {
            JwtSecurityToken token = CreateJwtToken(
                CreateAccessTokenClaims(user, sessionId, ipAddress),
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

    public string CreateRefreshToken(
        UserInfo user,
        string sessionId,
        string ipAddress)
    {
        var expiration = DateTime.UtcNow.AddDays(value:
            ITokenService.RefreshTokenExpirationTime
        );

        _logger.LogInformation(message:
            "User founded with email: {}", user.Email
        );

        try
        {
            JwtSecurityToken token = CreateJwtToken(
                claims: CreateRefreshTokenClaims(user, sessionId, ipAddress),
                credentials: CreateSigningCredentials(),
                expiration: expiration
            );

            _logger.LogInformation(message:
                "Token created: {}", token
            );

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

    private static List<Claim> CreateAccessTokenClaims(
        UserInfo user,
        string sessionId,
        string ipAddress)
    {
        var claims = new List<Claim> {
            // Registered claims
            new Claim(JwtRegisteredClaimNames.Iss, "https://auth:7135"),
            new Claim(JwtRegisteredClaimNames.Aud, ipAddress),
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(
                JwtRegisteredClaimNames.Exp,
                DateTime.UtcNow.AddDays(
                    value: ITokenService.RefreshTokenExpirationTime
                ).ToString(CultureInfo.InvariantCulture)
            ),
            new Claim(
                JwtRegisteredClaimNames.Jti,
                sessionId
            ),
            new Claim(
                JwtRegisteredClaimNames.Iat,
                DateTime.UtcNow.ToString(CultureInfo.InvariantCulture)
            ),
            new Claim(JwtRegisteredClaimNames.Typ, "refresh_token"),

            // Custom claims
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Sid, user.Id.ToString())
        };

        return claims;
    }

    private static List<Claim> CreateRefreshTokenClaims(
        UserInfo user,
        string sessionId,
        string ipAddress)
    {
        var claims = new List<Claim> {
            // Registered claims
            new Claim(JwtRegisteredClaimNames.Iss, "https://auth:7135"),
            new Claim(JwtRegisteredClaimNames.Aud, ipAddress),
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(
                JwtRegisteredClaimNames.Exp,
                DateTime.UtcNow.AddDays(
                    value: ITokenService.RefreshTokenExpirationTime
                ).ToString(CultureInfo.InvariantCulture)
            ),
            new Claim(
                JwtRegisteredClaimNames.Jti,
                sessionId
            ),
            new Claim(
                JwtRegisteredClaimNames.Iat,
                DateTime.UtcNow.ToString(CultureInfo.InvariantCulture)
            ),
            new Claim(JwtRegisteredClaimNames.Typ, "refresh_token"),

            // Custom claims
            new Claim(ClaimTypes.Email, user.Email)
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
