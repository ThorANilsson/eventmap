using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;

namespace EventmapApi.Model.Requests
{
    /// <summary>
    /// Used to get a list of Ticketmaster events based on location
    /// </summary>
    public class GetEventsRequest
    {
        /// <summary>
        /// Radius in kilometers from the search point
        /// </summary>
        [BindRequired]
        [Range(1, int.MaxValue, ErrorMessage = "Radius must be 1 or greater")]
        public required int Radius { get; set; }

        /// <summary>
        /// Search point latitude
        /// </summary>
        [BindRequired]
        [Range(-90, 90, ErrorMessage = "Latitude must be between -90 and 90 degrees")]
        public required double Latitude { get; set; }

        /// <summary>
        /// Search point longitude
        /// </summary>
        [BindRequired]
        [Range(-180, 180, ErrorMessage = "Longitude must be between -180 and 180 degrees")]
        public required double Longitude { get; set; }
    }
}
