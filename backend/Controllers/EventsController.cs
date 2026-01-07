using EventmapApi.Model;
using EventmapApi.Model.Requests;
using EventmapApi.Model.Responses;
using EventmapApi.Model.Ticketmaster;
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

    /// <summary>
    /// Get Events
    /// </summary>
    /// <remarks>
    /// Returns Ticketmaster Events based on location.
    /// </remarks>
    /// <response code="200">Returns the list of events.</response> 
    /// <response code="400">If the query parameters are invalid.</response>
    [HttpGet]
    [ProducesResponseType(typeof(GetEventsResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<GetEventsResponse>> Get([FromQuery] GetEventsRequest request)
    {
        try
        {
            var response = await _ticketmasterService.GetEvents(request);
            if (response != null)
            {
                return Ok(response);
            }
            else
            {
                throw new Exception("Ticketmaster service returned null");
            }
        }
        catch (Exception e)
        {
            return Problem(statusCode: 500, title: e.Message);
        }
    }

    /// <summary>
    /// Get Event by id
    /// </summary>
    /// <param name="eventId">Ticketmaster event id, should look something like this: Z698xZq2Z1ked-xJv</param>
    /// <remarks>
    /// Returns Ticketmaster Event + Wikipedia summary if available
    /// </remarks>
    /// <response code="200">Returns the event + Wikipedia summary if available.</response> 
    /// <response code="400">If the query parameters are invalid.</response>
    [HttpGet("{eventId}")]
    [ProducesResponseType(typeof(ExpandedEvent), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ExpandedEvent>> GetById(string eventId)
    {
        try
        {
            ExpandedEvent? expandedEvent = await _ticketmasterService.GetEvent(eventId);
            if (expandedEvent != null)
            {
                return Ok(expandedEvent);
            }
            else
            {
                throw new Exception("Ticketmaster service returned null when getting event by id");
            }
        }
        catch (Exception e)
        {
            return Problem(statusCode: 500, title: e.Message);
        }
    }
}
