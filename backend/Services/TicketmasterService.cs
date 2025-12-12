using Microsoft.Extensions.Options;
using Ticketmaster.Discovery;
using Ticketmaster.Discovery.Models;

namespace EventmapApiDemo.Services
{
    public class TicketmasterService
    {
        private readonly DiscoveryApi _api;

        public TicketmasterService(IOptions<TicketmasterOptions> options)
        {
            _api = new DiscoveryApi(options.Value.ApiKey);
        }
    }
}
