using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Dtos.Location
{
	public class CreateRoutesRequestDto
	{
		public string RouteName { get; set; } = string.Empty;
		public decimal MinFare { get; set; }
	}
}
