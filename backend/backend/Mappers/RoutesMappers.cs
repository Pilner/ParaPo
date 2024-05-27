using backend.Dtos.Location;
using backend.Models;

namespace backend.Mappers
{
	public static class RoutesMappers
	{
		public static RoutesDto ToRouteDto(this Routes routeModel)
		{
			return new RoutesDto
			{
				Id = routeModel.Id,
				RouteName = routeModel.RouteName,
				MinFare = routeModel.MinFare,
				Locations = routeModel.Locations.Select(c => c.ToLocationsDto()).ToList()
			};
		}

		public static Routes ToLocationFromCreateDto(this CreateRoutesRequestDto routesDto) 
		{
			return new Routes
			{
				RouteName = routesDto.RouteName,
				MinFare = routesDto.MinFare
			};
		}

	}
}
