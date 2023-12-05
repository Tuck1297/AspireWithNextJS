using Microsoft.Extensions.Configuration;

var builder = DistributedApplication.CreateBuilder(args);

var webapi = builder.AddProject<Projects.AspireWithNextJS_WebAPI>("aspirewithnextjs.webapi");

builder.AddNpmApp("frontend-nextjs", "../Net8HackathonAspire", "dev")
    .WithReference(webapi)
    .WithServiceBinding(scheme: "https");

builder.Build().Run();
