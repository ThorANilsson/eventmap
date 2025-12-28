using System.Text.Json.Serialization;

namespace EventmapApi.Model.TicketMasterClasses;

public class Start
{
    [JsonPropertyName("localDate")]
    public string LocalDate { get; set; }

    [JsonPropertyName("localTime")]
    public string LocalTime { get; set; }

    [JsonPropertyName("dateTime")]
    public DateTime DateTime { get; set; }
}