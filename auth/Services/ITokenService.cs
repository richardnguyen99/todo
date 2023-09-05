using auth.Models;

namespace auth.Services;

#region "token service"

public interface ITokenService
{
    public static readonly double AccessTokenExpirationTime = 30;
    public static readonly double RefreshTokenExpirationTime = 7;

    public List<string> CreateTokens(UserInfo user, string ipAddress);

    public string CreateAccessToken(UserInfo user, string sessionId, string ipAddress);

    public string CreateRefreshToken(UserInfo user, string sessionId, string ipAddress);
};

#endregion
