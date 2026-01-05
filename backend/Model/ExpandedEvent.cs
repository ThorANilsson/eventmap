namespace EventmapApi.Model
{
    public class ExpandedEvent
    {
        public required SimpleEvent Basics { get; set; }

        public WikipediaSummary? Wikipedia { get; set; }
    }
}
