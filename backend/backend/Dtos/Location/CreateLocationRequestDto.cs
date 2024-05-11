using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Dtos.Location
{
	public class CreateLocationRequestDto
	{
		public string LocName { get; set; } = string.Empty;
		public decimal MinFare { get; set; }
	}
}
