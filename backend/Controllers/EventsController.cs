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

    /// <summary>
    /// Get Events
    /// </summary>
    /// <remarks>
    /// Returns Ticketmaster Events based on location.
    /// </remarks>
    /// <response code="200">Returns the list of events.</response> 
    /// <response code="400">If the query parameters are invalid.</response>
    [HttpGet]
    [ProducesResponseType(typeof(List<Event>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
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
