using EventmapApiDemo.Model;
using Geohash;
using Microsoft.Extensions.Options;


namespace EventmapApiDemo.Services
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

        public async Task<List<Event>> GetEvents(double lat, double lng)
        {
            List<Event> events = new List<Event>();
            string units = "km";
            int radius = 20;
            string geoHash = _geohasher.Encode(lat, lng);
            string relativeUrl = $"events.json?apikey={_options.Value.ApiKey}&geoPoint={geoHash}&radius={radius}&unit={units}";
            
            var response = await _httpClient.GetAsync(relativeUrl);
            if (response.IsSuccessStatusCode)
            {
                var tmResponse = response.Content.ReadFromJsonAsync<TicketmasterResponse>();
                return tmResponse.Result?.Embedded?.Events ?? new List<Event>();
            }

            return events;
        } 
    }
}
