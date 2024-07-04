using backend.Data;
using backend.Dtos.Location;
using backend.Dtos.Locations;
using backend.Interfaces;
using backend.Mappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
	[Produces("application/json")]
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


		/// <summary>
		/// Gets all location
		/// </summary>
		/// <response code = "200">Returns Every location</response>
		/// 

		
		[HttpGet]
		[ProducesDefaultResponseType(typeof(LocationsDto))]

		public async Task<IActionResult> GetAll() 
		{
			var locations = await _locationRepo.GetAllAsync();

			var locationsDto = locations.Select(s => s.ToLocationsDto());

			return Ok(locationsDto);
		}

		/// <summary>
		/// Creates New Locations Based on The Route Id 
		/// </summary>
		/// <param name="RoutesId">The RouteId Foreign Key associated with the RouteId Primary Key</param>
		/// <param name="locationDto">Necessary Data to be filled up</param>
		/// <response code="201">Location Created</response>
		/// <response code="400">Location Already Exist</response>
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

		/// <summary>
		/// Returns a specific location based on the ID provided
		/// </summary>
		/// <param name="id">Returns a specific location based on the ID provided</param>
		/// <returns></returns>
		/// <response code="200">Returns a specific location</response>
		/// 
		
		[HttpGet("{id}")]
		[ProducesDefaultResponseType(typeof(LocationsDto))]
		public async Task<IActionResult> GetById([FromRoute] int id) 
		{
			var location = await _locationRepo.GetByIdAsync(id);

			if(location == null) 
			{
				return NotFound();
			}

			return Ok(location.ToLocationsDto());
		}
		/// <summary>
		/// Updates the data using the Location Id
		/// </summary>
		/// <param name="id">Selects the specific Location using the Id that is to be Updated</param>
		/// <param name="updateDto">Updates the data associated to the Location</param>
		/// <returns></returns>
		/// <response code ="200">Data Updated</response>
		/// <response code="404">Location Not Found</response>
		/// 
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

		/// <summary>
		/// Deletes the Locations based on the Id
		/// </summary>
		/// <param name="id">Selects the specific Location using the Id that is to be Deleted</param>
		/// <returns></returns>
		/// <response code = "404">Location Not Found or Location Already Deleted</response>
		/// <response code = "200">Location Deleted</response>
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
