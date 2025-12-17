using System.Text.Json.Serialization;

namespace EventmapApiDemo.Model.TicketMasterClasses;

public class Location
{
    [JsonPropertyName("longitude")]
    private double Longitude { get; }
    
    [JsonPropertyName("latitude")]
    private double Latitude { get; }
}