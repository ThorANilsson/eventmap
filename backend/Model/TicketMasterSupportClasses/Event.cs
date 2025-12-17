using System.Text.Json.Serialization;
using EventmapApiDemo.Model.TicketMasterClasses;
using EventmapApiDemo.Model.TicketMasterSupportClasses;

namespace EventmapApiDemo.Model;

public class Event
{
    [JsonPropertyName("name")]
    public string Name { get; set; }
    
    [JsonPropertyName("description")]
    public string Description { get; set; }
    
    [JsonPropertyName("priceRanges")]
    public List<PriceRange> PriceRanges { get; set; }
    
    [JsonPropertyName("id")]
    public string Id { get; set; }
    
    [JsonPropertyName("url")]
    public string Url { get; set; }
    
    [JsonPropertyName("distance")]
    public double Distance { get; set; }
    
    [JsonPropertyName("location")]
    public Location Location { get; set; }
    
    [JsonPropertyName("classifications")]
    public List<Classification> Classifications { get; set; }
    
    [JsonPropertyName("dates")]
    public Dates Dates { get; set; }
    
    [JsonPropertyName("_embedded")]
    public EventEmbedded Embedded { get; set; }
    
}
