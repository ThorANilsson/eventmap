using EventmapApi;
using EventmapApi.Services;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<TicketmasterOptions>(
    builder.Configuration.GetSection("Ticketmaster")
);

var apiKey = builder.Configuration["Ticketmaster:ApiKey"];
if (string.IsNullOrEmpty(apiKey))
{
    Console.Error.WriteLine("Ticketmaster API key is missing");
    Environment.Exit(1);
}

builder.Services.AddHttpClient<TicketmasterService>(client =>
{
    client.BaseAddress = new Uri("https://app.ticketmaster.com/discovery/v2/");
});

builder.Services.AddHttpClient<WikipediaService>(client =>
{
    client.BaseAddress = new Uri("https://en.wikipedia.org/");
    client.DefaultRequestHeaders.UserAgent.ParseAdd("Eventmap/1.0"); // Required by Wikipedia https://w.wiki/4wJS
});

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddHttpClient();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocal3000",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(options =>
    {
        options.WithTitle("Eventmap API");
    });
}

app.UseCors("AllowLocal3000");

app.MapControllers();

app.Run();
