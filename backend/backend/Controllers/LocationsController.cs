using backend.Data;
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

        public LocationsController(ILocationsRepository locationRepo)
        {
			_locationRepo = locationRepo;
        }

		[HttpGet]
		public async Task<IActionResult> GetAll() 
		{
			var locations = await _locationRepo.GetAllAsync();

			var locationsDto = locations.Select(s => s.ToLocationsDto());

			return Ok(locationsDto);
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
    }
}
