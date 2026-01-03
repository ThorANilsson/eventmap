using System.Text.Json.Serialization;

namespace EventmapApi.Model.TicketMasterClasses;

public class Dates
{
    [JsonPropertyName("start")]
    public Start? Start { get; set; }

    [JsonPropertyName("timezone")]
    public string? Timezone { get; set; }
    
    [JsonPropertyName("spanMultipleDays")]
    public bool SpanMultipleDays { get; set; }
}