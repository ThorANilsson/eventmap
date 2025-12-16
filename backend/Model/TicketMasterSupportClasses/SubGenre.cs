using System.Text.Json.Serialization;

namespace EventmapApiDemo.Model.TicketMasterClasses;

public class SubGenre
{
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }
}