using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
	public class Locations
	{
        // Stores the waypoints 
        // Id, Title = Landmark, Longitude, Latitude 

        public int Id { get; set; }
        public string locationName { get; set; } = string.Empty;

		public string Longitude { get; set; } = string.Empty;
		public string Latitude { get; set; } = string.Empty;

		public DateTime CreatedOn { get; set; } = DateTime.Now;

		// Linking together Relationships

		[ForeignKey("RoutesId")]
		public int? RoutesId { get; set; }
		public Routes? Routes { get; set; }
    }
}
