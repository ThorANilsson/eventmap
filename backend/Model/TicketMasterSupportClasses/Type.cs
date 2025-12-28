using System.Text.Json.Serialization;

namespace EventmapApi.Model.TicketMasterClasses;

public class Type
{
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; }
}