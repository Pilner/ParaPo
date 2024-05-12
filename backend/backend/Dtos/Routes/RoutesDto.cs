using backend.Dtos.Locations;
using backend.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Dtos.Location
{
	public class RoutesDto
	{
		public int Id { get; set; }

		public string RouteName { get; set; } = string.Empty;

		public decimal MinFare { get; set; }

		public List<LocationsDto> Locations { get; set; }

	}
}
