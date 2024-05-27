using backend.Data;
using backend.Dtos.Locations;
using backend.Interfaces;
using backend.Mappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
	[Route("api/locations")]
	[ApiController]
	public class LocationsController : ControllerBase
	{
		private readonly ILocationsRepository _locationRepo;
		private readonly IRoutesRepository _routesRepo;

        public LocationsController(ILocationsRepository locationRepo, IRoutesRepository routesRepo)
        {
			_locationRepo = locationRepo;
			_routesRepo = routesRepo;
        }

		[HttpGet]
		public async Task<IActionResult> GetAll() 
		{
			var locations = await _locationRepo.GetAllAsync();

			var locationsDto = locations.Select(s => s.ToLocationsDto());

			return Ok(locationsDto);
		}

		[HttpPost("{RoutesId}")]
		public async Task<IActionResult> Create([FromRoute] int RoutesId, CreateLocationDto locationDto)
		{
			if(!await _routesRepo.RoutesExists(RoutesId)) 
			{
				return BadRequest("Route does not exist");
			}

			var locationModel = locationDto.ToLocationsFromCreate(RoutesId);
			await _locationRepo.CreateAsync(locationModel);

			return CreatedAtAction(nameof(GetById), new {id = locationModel.Id}, locationModel.ToLocationsDto());
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetById([FromRoute] int id) 
		{
			var location = await _locationRepo.GetByIdAsync(id);

			if(location == null) 
			{
				return NotFound();
			}

			return Ok(location.ToLocationsDto());
		}

		[HttpPut]
		[Route("{id}")]

		public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateLocationRequestDto updateDto) 
		{
			var location = await _locationRepo.UpdateAsync(id, updateDto.ToCommentFromUpdate());

			if(location == null) 
			{
				return NotFound("Location Not Found");
			}

			return Ok(location.ToLocationsDto());
		}

		[HttpDelete]
		[Route("{id}")]
		public async Task<IActionResult> Delete([FromRoute] int id) 
		{
			var locationModel = await _locationRepo.DeleteAsync(id);
			if (locationModel == null) 
			{
				return NotFound("Location Does Not Exist");
			}

			return Ok(locationModel);
		}

	}
}
