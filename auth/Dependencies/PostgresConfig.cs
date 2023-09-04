using Microsoft.EntityFrameworkCore;

using auth.Data;

namespace auth.Dependencies;

public static class PostgresConfig
{
    public static IServiceCollection AddPostgresConfig(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<UserInfoContext>(options =>
        {
            options.UseNpgsql(
                configuration.GetConnectionString("AuthConnectionString"));
        });

        return services;
    }
}
