using backend.Data;
using backend.Dtos.Location;
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
        public RoutesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get all items in the DB
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var routes = await _context.Routes.ToListAsync();
            var routesDto = routes.Select(s => s.ToRouteDto());

            return Ok(routesDto);
        }

        //Get a single item in the DB based on the ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var routes = await _context.Routes.FindAsync(id);

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
            await _context.Routes.AddAsync(routesModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = routesModel.Id, }, routesModel.ToRouteDto());
        }

		//Update Data in the DB based on the ID
		[HttpPut]
        [Route("{id}")]

        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateRoutesRequestDto UpdateDto) 
        {
            var routeModel = await _context.Routes.FirstOrDefaultAsync(x => x.Id == id);
            if (routeModel == null)
            {
                return NotFound();
            }

			routeModel.RouteName = UpdateDto.RouteName;
            routeModel.MinFare = UpdateDto.MinFare;

            await _context.SaveChangesAsync();

            return Ok(routeModel.ToRouteDto());

        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var locationModel = await _context.Routes.FirstOrDefaultAsync(x => x.Id == id);
            if (locationModel == null) 
            {
                return NotFound();
            }

            _context.Routes.Remove(locationModel);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
