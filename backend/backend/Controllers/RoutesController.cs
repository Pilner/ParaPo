using backend.Data;
using backend.Dtos.Location;
using backend.Dtos.Locations;
using backend.Interfaces;
using backend.Mappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
	[Produces("application/json")]
	[Route("api/routes")]
    [ApiController]
    public class RoutesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IRoutesRepository _routesRepo;
        private readonly ILocationsRepository _locationsRepo;
        public RoutesController(ApplicationDbContext context, IRoutesRepository routesRepo, ILocationsRepository locationsRepo)
        {
            _routesRepo = routesRepo;
            _context = context;
            _locationsRepo = locationsRepo;

        }

        /// <summary>
        /// Returns all the routes including the associated locations
        /// </summary>
        /// <returns>Returns all the routes including the associated locations</returns>
        /// <remarks>
        /// </remarks>
        /// 
        /// <response code="200">Returns every Routes</response>
        /// 

        // Get all items in the DB
            
		[HttpGet]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesDefaultResponseType(typeof(RoutesDto))]
		
		public async Task<IActionResult> GetAll()
        {
            var routes = await _routesRepo.GetAllAsync();
            var routesDto = routes.Select(s => s.ToRouteDto());

            return Ok(routesDto);
        }

		/// <summary>
		/// Returns a specific route based on the ID provided
		/// </summary>
		/// <param name="id">Selects the specific Route using the Id</param>
		/// <returns></returns>
		/// <response code="200">Returns a single route</response>
		/// <response code="404">Route Not Found</response>
        /// 
		//Get a single item in the DB based on the ID
		
		[HttpGet("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesDefaultResponseType(typeof(RoutesDto))]
		public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var routes = await _routesRepo.GetByIdAsync(id);

            if (routes == null)
            {
                return NotFound();
            }

            return Ok(routes.ToRouteDto());
        }

		/// <summary>
		/// Creates a new Route
		/// </summary>
		/// <param name="routesDto">Route Name and Minimum Fare is needed to create a new route</param>
		/// <response code ="200">Route Successfully Created</response>
        /// 

		// Add new Items

		[HttpPost]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesDefaultResponseType(typeof(CreateRoutesRequestDto))]


		public async Task<IActionResult> Create([FromBody] CreateRoutesRequestDto routesDto)
        {
            var routesModel = routesDto.ToLocationFromCreateDto();
            await _routesRepo.CreateAsync(routesModel);
            return CreatedAtAction(nameof(GetById), new { id = routesModel.Id, }, routesModel.ToRouteDto());
        }

		/// <summary>
		/// Updates the data using the Route Id 
		/// </summary>
		/// <param name="id">Selects the specific Route using the Id that is to be Updated</param>
		/// <param name="UpdateDto">Updates the Route Name and Minimum Fare</param>
		/// <response code ="200">Data Updated</response>
		/// <response code="404">Route Not Found</response>
		//Update Data in the DB based on the ID

		[HttpPut]
        [Route("{id}")]
		[ProducesResponseType(StatusCodes.Status200OK)]


		public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateRoutesRequestDto UpdateDto) 
        {
            var routeModel = await _routesRepo.UpdateAsync(id, UpdateDto);
            if (routeModel == null)
            {
                return NotFound();
            }

            return Ok(routeModel.ToRouteDto());

        }

		/// <summary>
		/// Deletes the Route and Associated Locations
		/// </summary>
		/// <param name="id">Selects the specific Route using the Id that is to be Deleted</param>
		/// <response code = "404">Route Not Found or Route Already Deleted</response>
		/// <response code = "204">Route Deleted</response>
		// Delete Data from the DB using ID
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
			var locationsModel = await _locationsRepo.DeleteAllAsync(id);
			var routesModel = await _routesRepo.DeleteAsync(id);

            if (routesModel == null) 
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
