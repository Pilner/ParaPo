using backend.Dtos.Location;
using backend.Models;

namespace backend.Mappers
{
	public static class LocationMappers
	{
		public static LocationDto ToLocationDto(this Location locationModel)
		{
			return new LocationDto
			{
				Id = locationModel.Id,
				LocName = locationModel.LocName,
				MinFare = locationModel.MinFare
			};
		}

		public static Location ToLocationFromCreateDto(this CreateLocationRequestDto stockDto) 
		{
			return new Location
			{
				LocName = stockDto.LocName,
				MinFare = stockDto.MinFare
			};
		}

	}
}
