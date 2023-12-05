using AspireWithNextJS.WebAPI.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using ReactWithASP.Server.Data;
using ReactWithASP.Server.Helpers;
using ReactWithASP.Server.Services;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Hackathon Application", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });

    option.OperationFilter<AuthResponsesOperationFilter>();
});

// Add db context
var dbConnection = builder.Configuration.GetConnectionString("DbString");
var dbConnection2 = builder.Configuration.GetConnectionString("SupplyChainConnection");
var dbConnection3 = builder.Configuration.GetConnectionString("WebsiteInfoConnection");

builder.Services.AddDbContext<DataContext>(options =>
{
    if (dbConnection != null)
    {
        options.UseNpgsql(dbConnection);
    }
});

builder.Services.AddDbContext<SupplyChainContext>(options =>
{
    if (dbConnection != null)
    {
        options.UseNpgsql(dbConnection2);
    }
});

builder.Services.AddDbContext<WebsiteContext>(options =>
{
    if (dbConnection != null)
    {
        options.UseNpgsql(dbConnection3);
    }
});

builder.Services.AddAuthentication().AddCookie("default", o =>
{
    o.Cookie.Name = "Session_Token";
    //o.Cookie.Domain = "";
    o.Cookie.Path = "/";
    o.Cookie.HttpOnly = true; // IN PRODUCTION THIS SHOULD BE SET TO TRUE
    o.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    o.Cookie.SameSite = SameSiteMode.Lax;
    o.ExpireTimeSpan = TimeSpan.FromMinutes(15);
    o.SlidingExpiration = true;

});

builder.Services.AddAuthorization(builder =>
{
    builder.AddPolicy("Admin-Policy", pb => pb.RequireAuthenticatedUser().RequireClaim(ClaimTypes.Role, "Admin"));
    builder.AddPolicy("User-Policy", pb => pb.RequireAuthenticatedUser().RequireClaim(ClaimTypes.Role, "User"));

});

var serviceProvider = builder.Services.BuildServiceProvider();
var logger = serviceProvider.GetRequiredService<ILogger<ControllerBase>>();
builder.Services.AddSingleton(typeof(ILogger), logger);

var config = new MapperConfiguration(cfg =>
{
    cfg.AddProfile(new MappingProfiles());
});

var mapper = config.CreateMapper();

builder.Services.AddSingleton(mapper);

builder.Services.AddCors(policyBuilder =>
    policyBuilder.AddDefaultPolicy(policy =>
        policy.SetIsOriginAllowed(host => true)
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()
));


// Declared Services
builder.Services.AddScoped<AuthServices>();
builder.Services.AddScoped<ConnectionStringsService>();
builder.Services.AddScoped<UserServices>();
builder.Services.AddScoped<AiServices>();

var app = builder.Build();

app.MapDefaultEndpoints();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

//app.MapControllers();

app.MapControllerRoute(name: "auth", pattern: "/auth/*");
app.MapControllerRoute(name: "cs", pattern: "/cs/*");
app.MapControllerRoute(name: "user", pattern: "/user/*");
app.MapControllerRoute(name: "external", pattern: "/external/*");
app.MapControllerRoute(name: "ai", pattern: "/ai/*");

app.MapFallbackToFile("/index.html");

app.Run();
