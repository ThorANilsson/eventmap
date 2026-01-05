using EventmapApi.Model;
using System.Text.Json;
using static System.Net.Mime.MediaTypeNames;

namespace EventmapApi.Services
{
    public class WikipediaService
    {
        private readonly HttpClient _httpClient;

        public WikipediaService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<WikipediaSummary?> GetWikipediaSummary(string eventName)
        {
            string? articleTitle = await GetFirstArticleTitle(eventName);

            if (articleTitle == null)
            {
                return null;
            }

            string articleTitleWithUnderscores = articleTitle.Replace(' ', '_');

            string relativeUrl = $"api/rest_v1/page/summary/" +
                $"{articleTitleWithUnderscores}";

            var response = await _httpClient.GetAsync(relativeUrl);
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(json);

                var root = doc.RootElement;

                if (!root.TryGetProperty("content_urls", out var contentUrls)) return null;
                if (!contentUrls.TryGetProperty("desktop", out var desktop)) return null;
                if (!desktop.TryGetProperty("page", out var pageUrlProp)) return null;
                if (!root.TryGetProperty("title", out var titleProp)) return null;
                if (!root.TryGetProperty("description", out var descProp)) return null;
                if (!root.TryGetProperty("extract", out var extractProp)) return null;

                string? imageSource = null;
                if (root.TryGetProperty("originalimage", out var originalImageProp))
                {
                    if (originalImageProp.TryGetProperty("source", out var sourceProp))
                    {
                        if (sourceProp.GetString() != null)
                        {
                            imageSource = sourceProp.GetString()!;
                        }
                    }
                }

                return new WikipediaSummary
                {
                    PageUrl = pageUrlProp.GetString()!,
                    Title = articleTitle,
                    Description = descProp.GetString()!,
                    Extract = extractProp.GetString()!,
                    ImageUrl = imageSource
                };
            }

            return null;
        }

        /// <summary>
        /// Searches Wikipedia for articles based on event name
        /// </summary>
        /// <returns>Title of the first article</returns>
        private async Task<string?> GetFirstArticleTitle(string eventName)
        {
            // We trim the eventName
            // E.g: "Benjamin Ingrosso - WHAT HAPPENS NEXT?" becomes just "Benjamin Ingrosso "
            // This seems to produce good Wikipedia results more often
            string trimmedEventName = eventName;
            int dashPosition = eventName.IndexOf("-");
            if (dashPosition >= 0)
            {
                trimmedEventName = trimmedEventName.Substring(0, dashPosition);
            }

            int pipePosition = eventName.IndexOf("|");
            if (pipePosition >= 0)
            {
                trimmedEventName = trimmedEventName.Substring(0, pipePosition);
            }

            //Console.WriteLine("eventName: " + eventName);
            //Console.WriteLine("trimmedEventName: " + trimmedEventName);

            string relativeUrl = $"w/api.php?" +
                $"action=query&" +
                $"list=search&" +
                $"srsearch={trimmedEventName}&" +
                $"format=json";

            var response = await _httpClient.GetAsync(relativeUrl);
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(json);

                var root = doc.RootElement;

                if (!root.TryGetProperty("query", out var query))
                {
                    //Console.WriteLine("GetFirstArticleTitle: query was null");
                    return null;
                }

                if (!query.TryGetProperty("search", out var searchArray))
                {
                    //Console.WriteLine("GetFirstArticleTitle: search was null");
                    return null;
                }

                if (searchArray.GetArrayLength() == 0)
                {
                    //Console.WriteLine("GetFirstArticleTitle: GetArrayLength was 0");
                    return null;
                }

                var first = searchArray[0];

                if (!first.TryGetProperty("title", out var titleProp))
                {
                    //Console.WriteLine("GetFirstArticleTitle: title was null");
                    return null; 
                }

                return titleProp.GetString();
            }

            Console.WriteLine(await response.Content.ReadAsStringAsync());
            return null;
        }
    }
}
