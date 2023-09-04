// Main entry point for the Authentication service
using auth.Services;
using auth.Dependencies;
using auth.Repositories;

// Create a web application instance
var builder = WebApplication.CreateBuilder(args);

// Add dependencies to the container
builder.Services.AddRedisConfig(builder.Configuration);
builder.Services.AddPostgresConfig(builder.Configuration);
builder.Services.AddLogging();
builder.Services.AddHttpContextAccessor();

builder.Services.AddGrpc();

// Add services to the container
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<AuthService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapGrpcService<AuthService>();

app.MapGet("/", async context =>
{
    await context.Response.WriteAsync("Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");
});


app.UseHttpsRedirection();
app.MapControllers();

app.Run();
