namespace backend.Dtos.Location
{
	public class UpdateLocationRequestDto
	{
		public string LocName { get; set; } = string.Empty;
		public decimal MinFare { get; set; }
	}
}
