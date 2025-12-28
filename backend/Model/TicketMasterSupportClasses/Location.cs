using System.Text.Json.Serialization;

namespace EventmapApi.Model.TicketMasterClasses;

public class Location
{
    [JsonPropertyName("longitude")]
    private double Longitude { get; }
    
    [JsonPropertyName("latitude")]
    private double Latitude { get; }
}