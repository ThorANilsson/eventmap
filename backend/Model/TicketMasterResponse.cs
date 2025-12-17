using System.Text.Json.Serialization;

namespace EventmapApiDemo.Model;

public class TicketmasterResponse
{
    [JsonPropertyName("_embedded")]
    public Embedded? Embedded { get; set; }

}

public class Embedded
{
    public List<Event> Events { get; set; } = new();
}
