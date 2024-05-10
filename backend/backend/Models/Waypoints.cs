namespace backend.Models
{
	public class Waypoints
	{
        // Stores the waypoints 
        // Id, Title = Landmark, Longitude, Latitude 

        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;

		public string Longitude { get; set; } = string.Empty;
		public string Latitude { get; set; } = string.Empty;


		// Linking together Relationships

		public int? LocationId { get; set; }
		public Location? Location { get; set; }
    }
}
