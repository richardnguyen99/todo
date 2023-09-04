// Main entry point for the Authentication service

using Microsoft.EntityFrameworkCore;

using auth.Models;
using auth.Controllers;
using auth.Services;

// Create a web application instance
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddLogging();

// Add database context to the container
builder.Services.AddEntityFrameworkNpgsql()
    .AddDbContext<UserInfoContext>(options => options.UseNpgsql(
        builder.Configuration.GetConnectionString("AuthConnectionString")
    ));

// Add services to the container
builder.Services.AddScoped<IAuthController, AuthController>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<AuthService>();

builder.Services.AddControllers();
builder.Services.AddGrpc();
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
