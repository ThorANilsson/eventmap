using Microsoft.Extensions.Options;

namespace EventmapApiDemo.Services
{
    public class TicketmasterService
    {
        public TicketmasterService(IOptions<TicketmasterOptions> options)
        {
            // API key to ticketmaster can be found in options.Value.ApiKey
        }
    }
}
