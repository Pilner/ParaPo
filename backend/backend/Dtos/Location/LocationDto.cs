using backend.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Dtos.Location
{
	public class LocationDto
	{
		public int Id { get; set; }

		public string LocName { get; set; } = string.Empty;

		public decimal MinFare { get; set; }

	}
}
