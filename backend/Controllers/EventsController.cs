using EventmapApiDemo.Model;
using EventmapApiDemo.Services;
using Microsoft.AspNetCore.Mvc;

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

    [HttpGet]
    public async Task<List<Event>> Get(double lat, double lng)
    {
       List<Event> events = await _ticketmasterService.GetEvents(lat, lng);

       return events;
    }
    

    [HttpGet("test")]
    public IActionResult Test()
    {
        return Ok();
    }
}
