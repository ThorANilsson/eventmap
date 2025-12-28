using EventmapApi.Model;
using EventmapApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace EventmapApi.Controllers;

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

    [HttpGet("{id}")]
    public async Task<Event> Get(string id)
    {
        Event e = await _ticketmasterService.GetEvent(id);
        return e;
    }
    

    [HttpGet("test")]
    public IActionResult Test()
    {
        return Ok();
    }
}
