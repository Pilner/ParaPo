using backend.Dtos.Locations;
using backend.Models;

namespace backend.Mappers
{
	public static class LocationMapper
	{
		// Maps the DTO to the Mapper
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

		public static Locations ToLocationsFromCreate(this CreateLocationDto locationDto, int RoutesId)
		{
			return new Locations
			{
				locationName = locationDto.locationName,
				Longitude = locationDto.Longitude,
				Latitude = locationDto.Latitude,
				RoutesId = RoutesId,
			};
		}

		public static Locations ToCommentFromUpdate(this UpdateLocationRequestDto locationDto)
		{
			return new Locations
			{
				locationName = locationDto.locationName,
				Longitude = locationDto.Longitude,
				Latitude = locationDto.Latitude,
			};
		}
	}
}
