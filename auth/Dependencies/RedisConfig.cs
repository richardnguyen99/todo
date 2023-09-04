namespace auth.Dependencies;

public static class RedisConfig
{
    public static IServiceCollection AddRedisConfig(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = configuration.GetConnectionString("RedisConnectionString");
            options.InstanceName = "auth";
        });

        return services;
    }
}
