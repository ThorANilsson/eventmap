using System.Text.Json.Serialization;

namespace EventmapApi.Model.TicketMasterClasses;

public class Genre
{
    [JsonPropertyName("id")]
    public string? Id { get; set; }

    [JsonPropertyName("name")]
    public string? Name { get; set; }
}