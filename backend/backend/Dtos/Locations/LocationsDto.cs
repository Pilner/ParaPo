﻿using backend.Models;

namespace backend.Dtos.Locations
{
	public class LocationsDto
	{
		// DTO for breaking or sifting data to desirable ones 
		public int Id { get; set; }
		public string locationName { get; set; } = string.Empty;

		public string Longitude { get; set; } = string.Empty;

		public string Latitude { get; set; } = string.Empty;

		public DateTime CreatedOn { get; set; } = DateTime.Now;

		public int? RoutesId { get; set; }
	}
}
