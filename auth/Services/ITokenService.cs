using auth.Models;

namespace auth.Services;

#region "token service"

public interface ITokenService
{
    public static readonly double ExpirationTime = 60;

    public string CreateAccessToken(UserInfo user);

    public string CreateRefreshToken(UserInfo user);
};

#endregion
