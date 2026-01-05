using EventmapApi.Model;
using EventmapApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace EventmapApi.Controllers;

[ApiController]
[Route("[controller]")]

    public class WikipediaController : ControllerBase
    {
        private readonly WikipediaService _wikipediaService;

        public WikipediaController(WikipediaService wikipediaService)
        {
            _wikipediaService = wikipediaService;
        }

        /// <summary>
        /// Get summary
        /// </summary>
        [HttpGet("get-summary")]
        public async Task<ActionResult<WikipediaSummary>> GetSummary([FromQuery] string eventName)
        {
            WikipediaSummary? wikipediaSummary = await _wikipediaService.GetWikipediaSummary(eventName);

            if (wikipediaSummary == null)
            {
                return Problem(statusCode: 500, title: "Could not get Wikipedia summary for event");
            }

            return Ok(wikipediaSummary);
        }
    }
