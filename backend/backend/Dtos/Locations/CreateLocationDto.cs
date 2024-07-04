namespace backend.Dtos.Locations
{
	public class CreateLocationDto
	{
		// DTO for breaking or sifting data to desirable ones 
		public string locationName { get; set; } = string.Empty;

		public string Longitude { get; set; } = string.Empty;

		public string Latitude { get; set; } = string.Empty;
	}
}
