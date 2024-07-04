using backend.Dtos.Locations;
using backend.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Dtos.Location
{
	public class RoutesDto
	{
		// DTO for breaking or sifting data to desirable ones 
		public int Id { get; set; }

		public string RouteName { get; set; } = string.Empty;

		public string Category { get; set; } = string.Empty;

		public decimal MinFare { get; set; }

		public List<LocationsDto> Locations { get; set; }
	}
}
