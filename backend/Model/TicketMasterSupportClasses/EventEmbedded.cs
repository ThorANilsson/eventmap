using System.Text.Json.Serialization;

namespace EventmapApi.Model.TicketMasterSupportClasses;

public class EventEmbedded
{
    [JsonPropertyName("venues")]
    public List<Venue> Venues { get; set; }
}