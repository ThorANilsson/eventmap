using EventmapApi.Model;
using EventmapApi.Model.Requests;
using EventmapApi.Model.Responses;
using EventmapApi.Model.Ticketmaster;
using Geohash;
using Microsoft.Extensions.Options;


namespace EventmapApi.Services
{
    public class TicketmasterService
    {
        private Geohasher _geohasher = new  Geohasher();
        private readonly HttpClient _httpClient;
        private readonly IOptions<TicketmasterOptions> _options;
        // API key to ticketmaster can be found in options.Value.ApiKey

        public TicketmasterService(HttpClient httpClient, IOptions<TicketmasterOptions> options)
        {
            _httpClient = httpClient;
            _options = options;
        }

        public async Task<GetEventsResponse?> GetEvents(GetEventsRequest request)
        {
            string units = "km";
            string geoHash = _geohasher.Encode(request.Latitude, request.Longitude);
            
            List<SimpleEvent> allEvents = new List<SimpleEvent>();

            int totalPages = 1;

            for (int i = 0; i < totalPages && i < 5; i++)
            {
                string relativeUrl = $"events.json?" +
                    $"apikey={_options.Value.ApiKey}&" +
                    $"geoPoint={geoHash}&" +
                    $"radius={request.Radius}&" +
                    $"unit={units}&" +
                    $"size=100&" +
                    $"page={i}"; 

                var response = await _httpClient.GetAsync(relativeUrl);
                if (response.IsSuccessStatusCode)
                {
                    var tmResponse = await response.Content.ReadFromJsonAsync<SearchEventsResponse>();

                    if (tmResponse == null)
                    {
                        continue;
                    }

                    if (i == 0 && tmResponse.Page != null)
                    {
                        totalPages = tmResponse.Page.TotalPages;
                    }

                    if (tmResponse.Embedded?.Events != null)
                    {
                        foreach (var tmEvent in tmResponse.Embedded.Events)
                        {
                            SimpleEvent simpleEvent = new()
                            {
                                Id = tmEvent.Id,
                                Name = tmEvent.Name,
                                VenueName = tmEvent.Embedded?.Venues.First().Name,
                                Location = tmEvent.Embedded?.Venues.First().Location,
                                Category = tmEvent.Classifications?.First().Segment?.Name,
                                Genre = tmEvent.Classifications?.First().Genre?.Name,
                                Date = tmEvent.Dates?.Start?.DateTime,
                                ImageUrl = tmEvent.Images?.FirstOrDefault()?.Url,
                                EventUrl = tmEvent.Url
                            };
                            allEvents.Add(simpleEvent);
                        }
                    }
                }
            }

            return new GetEventsResponse
            { 
                Events = allEvents 
            };
        }

        /* public async Task<Event> GetEvent(string id)
        {
            string relativeUrl = $"events/{id}.json?apikey={_options.Value.ApiKey}";
            
            var response = await _httpClient.GetAsync(relativeUrl);
            if (response.IsSuccessStatusCode)
            {
                var tmResponse = response.Content.ReadFromJsonAsync<Event>();
                return tmResponse.Result ?? new Event();
            }
            throw new BadHttpRequestException($"Error in TicketmasterService: {response.StatusCode}");
        } */
    }
}