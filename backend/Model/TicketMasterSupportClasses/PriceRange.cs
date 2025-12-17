using System.Text.Json.Serialization;

namespace EventmapApiDemo.Model.TicketMasterClasses;

public class PriceRange
{
    [JsonPropertyName("currency")]
    string Currency { get; set; }
    
    [JsonPropertyName("max")]
    int Max { get; set; }
    
    [JsonPropertyName("min")]
    int Min { get; set; }
}