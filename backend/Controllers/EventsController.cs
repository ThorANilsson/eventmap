using EventmapApi.Model;
using EventmapApi.Model.Requests;
using EventmapApi.Services;
using Microsoft.AspNetCore.Mvc;
using Scalar.AspNetCore;

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
    public async Task<List<Event>> Get([FromQuery] GetEventsRequest request)
    {
       List<Event> events = await _ticketmasterService.GetEvents(request);

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
