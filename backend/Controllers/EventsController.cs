using EventmapApiDemo.Services;
using Microsoft.AspNetCore.Mvc;
using Ticketmaster.Discovery.Models;

namespace EventmapApiDemo.Controllers;

[ApiController]
[Route("[controller]")]

public class EventsController : ControllerBase
{
    private readonly TicketmasterService _ticketmasterService;

    public EventsController(TicketmasterService ticketmasterService)
    {
        _ticketmasterService = ticketmasterService;
    }

    [HttpGet("test")]
    public IActionResult Test()
    {
        return Ok();
    }
}
