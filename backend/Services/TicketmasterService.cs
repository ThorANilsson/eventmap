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
            string latlong = $"{request.Latitude},{request.Longitude}";
            string relativeUrl = $"events.json?" +
                $"apikey={_options.Value.ApiKey}&" +
                $"geoPoint={geoHash}&" +
                $"radius={request.Radius}&" +
                $"unit={units}&" +
                $"size=100";

            var response = await _httpClient.GetAsync(relativeUrl);
            if (response.IsSuccessStatusCode)
            {
                var tmResponse = await response.Content.ReadFromJsonAsync<SearchEventsResponse>();

                if (tmResponse == null)
                {
                    throw new Exception("Response from Ticketmaster was null");
                }

                List<SimpleEvent> events = [];

                foreach (var tmEvent in tmResponse.Embedded.Events)
                {
                    SimpleEvent simpleEvent = new()
                    {
                        Id = tmEvent.Id,
                        Name = tmEvent.Name,
                        VenueName = tmEvent.Embedded?.Venues.First().Name,
                        Location = tmEvent.Embedded?.Venues.First().Location,
                    };
                    events.Add(simpleEvent);
                }

                return new GetEventsResponse
                { 
                    Events = events 
                };
            }
            throw new Exception("Could not get events from Ticketmaster API");
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
