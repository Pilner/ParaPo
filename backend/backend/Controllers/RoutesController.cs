using backend.Data;
using backend.Dtos.Location;
using backend.Interfaces;
using backend.Mappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/routes")]
    [ApiController]
    public class RoutesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IRoutesRepository _routesRepo;
        public RoutesController(ApplicationDbContext context, IRoutesRepository routesRepo)
        {
            _routesRepo = routesRepo;
            _context = context;
        }

        // Get all items in the DB
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var routes = await _routesRepo.GetAllAsync();
            var routesDto = routes.Select(s => s.ToRouteDto());

            return Ok(routesDto);
        }

        //Get a single item in the DB based on the ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var routes = await _routesRepo.GetByIdAsync(id);

            if (routes == null)
            {
                return NotFound();
            }

            return Ok(routes.ToRouteDto());
        }

        // Add new Items
        [HttpPost]

        public async Task<IActionResult> Create([FromBody] CreateRoutesRequestDto routesDto)
        {
            var routesModel = routesDto.ToLocationFromCreateDto();
            await _routesRepo.CreateAsync(routesModel);
            return CreatedAtAction(nameof(GetById), new { id = routesModel.Id, }, routesModel.ToRouteDto());
        }

		//Update Data in the DB based on the ID
		[HttpPut]
        [Route("{id}")]

        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateRoutesRequestDto UpdateDto) 
        {
            var routeModel = await _routesRepo.UpdateAsync(id, UpdateDto);
            if (routeModel == null)
            {
                return NotFound();
            }

            return Ok(routeModel.ToRouteDto());

        }

        // Delete Data from the DB using ID
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var routesModel = await _routesRepo.DeleteAsync(id);
            if (routesModel == null) 
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
