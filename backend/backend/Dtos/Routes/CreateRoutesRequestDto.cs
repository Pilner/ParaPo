using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Dtos.Location
{
	public class CreateRoutesRequestDto
	{
		// DTO for breaking or sifting data to desirable ones 
		public string RouteName { get; set; } = string.Empty;
		public string Category { get; set; } = string.Empty;
		public decimal MinFare { get; set; }
	}
}
