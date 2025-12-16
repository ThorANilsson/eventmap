using EventmapApiDemo.Model.TicketMasterClasses;

namespace EventmapApiDemo.Model;

public class Venue
{
    public string name { get; set; }
    public string id { get; set; }
    public string url { get; set; }
    public string postalCode { get; set; }
    public City city { get; set; }
    public Country country { get; set; }
    public Address address { get; set; }
    public Location location { get; set; }
}

public class City 
{
    public string name { get; set; }
}
public class Country
{
    public string name { get; set; }
    public string code { get; set; }
}
public class Address
{
    public string line1 { get; set; }
    public string line2 { get; set; }
    public string line3 { get; set; }
}