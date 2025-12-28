using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace EventmapApi.Model.Requests
{
    public class GetEventsRequest
    {
        [BindRequired]
        public required int Radius { get; set; }

        [BindRequired]
        public required double Latitude { get; set; }

        [BindRequired]
        public required double Longitude { get; set; }
    }
}
