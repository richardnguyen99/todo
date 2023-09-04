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

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string CreateAccessToken(UserInfo user)
    {
        var expiration = DateTime.UtcNow
                            .AddMinutes(ITokenService.ExpirationTime);

        JwtSecurityToken token;

        try
        {
            token = CreateJwtToken(
                CreateClaims(user),
                CreateSigningCredentials(),
                expiration
            );

            var tokenHandler = new JwtSecurityTokenHandler();
            var stringToken = tokenHandler.WriteToken(token);

            return stringToken;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return string.Empty;
        }
    }

    public string CreateRefreshToken(UserInfo user)
    {
        var refreshToken = Guid.NewGuid().ToString();

        return refreshToken;
    }

    private static JwtSecurityToken CreateJwtToken(
        List<Claim> claims, SigningCredentials credentials, DateTime expiration)
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
