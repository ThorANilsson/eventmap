using System.Net.Mime;
using System.Text.Json.Serialization;
using EventmapApi.Model.TicketMasterClasses;

namespace EventmapApi.Model;

public class Venue
{
    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("id")]
    public string? Id { get; set; }

    [JsonPropertyName("url")]
    public string? Url { get; set; }
    
    [JsonPropertyName("distance")]
    public double Distance { get; set; }

    [JsonPropertyName("units")]
    public string? Units { get; set; }

    [JsonPropertyName("postalCode")]
    public string? PostalCode { get; set; }

    [JsonPropertyName("timezone")]
    public string? Timezone { get; set; }

    [JsonPropertyName("city")]
    public City? City { get; set; }

    [JsonPropertyName("country")]
    public Country? Country { get; set; }

    [JsonPropertyName("address")]
    public Address? Address { get; set; }

    [JsonPropertyName("location")]
    public Location? Location { get; set; }
}

public class City 
{
    [JsonPropertyName("name")]
    public string? Name { get; set; }
}
public class Country
{
    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("countryCode")]
    public string? CountryCode { get; set; }
}
public class Address
{
    [JsonPropertyName("line1")]
    public string? Line1 { get; set; }
    
    [JsonPropertyName("line2")]
    public string? Line2 { get; set; }
    
    [JsonPropertyName("line3")]
    public string? Line3 { get; set; }
}