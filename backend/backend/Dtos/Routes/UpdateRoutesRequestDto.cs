namespace backend.Dtos.Location
{
	public class UpdateRoutesRequestDto
	{
		public string RouteName { get; set; } = string.Empty;
		public decimal MinFare { get; set; }
	}
}
