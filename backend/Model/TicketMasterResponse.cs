using System.Text.Json.Serialization;

namespace EventmapApiDemo.Model;

public class TicketmasterResponse
{
    [JsonPropertyName("_embedded")]
    public Embedded? Embedded { get; set; }

    public PageInfo? Page { get; set; }
}

public class Embedded
{
    public List<Event> Events { get; set; } = new();
}

public class PageInfo
{
    public int Size { get; set; }
    public int TotalElements { get; set; }
    public int TotalPages { get; set; }
    public int Number { get; set; }
}