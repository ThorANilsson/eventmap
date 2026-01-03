using EventmapApi.Model.Ticketmaster;

namespace EventmapApi.Model
{
    public class SimpleEvent
    {
        public required string Id { get; set; }

        public string? Name { get; set; }

        public string? VenueName { get; set; }

        public Location? Location { get; set; }
    }
}
