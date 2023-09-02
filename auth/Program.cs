using Microsoft.EntityFrameworkCore;

using auth.Models;
using auth.Controllers;
using auth.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEntityFrameworkNpgsql()
    .AddDbContext<UserInfoContext>(options => options.UseNpgsql(
        builder.Configuration.GetConnectionString("AuthConnectionString")
    ));

builder.Services.AddScoped<IAuthController, AuthController>();

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

app.MapGrpcService<AuthService>();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
