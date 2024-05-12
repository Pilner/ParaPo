using backend.Dtos.Locations;
using backend.Models;

namespace backend.Mappers
{
	public static class LocationMapper
	{
		public static LocationsDto ToLocationsDto(this Locations locationsModel) 
		{
			return new LocationsDto
			{
				Id = locationsModel.Id,
				locationName = locationsModel.locationName,
				Longitude = locationsModel.Longitude,
				Latitude = locationsModel.Latitude,
				CreatedOn = locationsModel.CreatedOn,
				RoutesId = locationsModel.RoutesId,
			};
		}
	}
}
