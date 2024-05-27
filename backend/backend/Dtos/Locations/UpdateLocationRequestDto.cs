namespace backend.Dtos.Locations
{
	public class UpdateLocationRequestDto
	{
		public string locationName { get; set; } = string.Empty;

		public string Longitude { get; set; } = string.Empty;

		public string Latitude { get; set; } = string.Empty;
	}
}
