using System.Text.Json.Serialization;

namespace EventmapApi.Model.TicketMasterClasses;

public class PriceRange
{
    [JsonPropertyName("currency")]
    string Currency { get; set; }
    
    [JsonPropertyName("max")]
    int Max { get; set; }
    
    [JsonPropertyName("min")]
    int Min { get; set; }
}