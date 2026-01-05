namespace EventmapApi.Model
{
    public class WikipediaSummary
    {
        public required string PageUrl { get; set; }

        public required string Title { get; set; }

        public required string Description { get; set; }

        public required string Extract { get; set; }

        public string? ImageUrl { get; set; }
    }
}
