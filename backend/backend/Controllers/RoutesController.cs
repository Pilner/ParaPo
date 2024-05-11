using backend.Data;
using backend.Dtos.Location;
using backend.Mappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult GetAll()
        {
            var routes = _context.Routes.ToList()
                .Select(s => s.ToRouteDto());

            return Ok(routes);
        }

        //Get a single item in the DB based on the ID
        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var routes = _context.Routes.Find(id);

            if (routes == null)
            {
                return NotFound();
            }

            return Ok(routes.ToRouteDto());
        }

        // Add new Items
        [HttpPost]

        public IActionResult Create([FromBody] CreateRoutesRequestDto routesDto)
        {
            var routesModel = routesDto.ToLocationFromCreateDto();
            _context.Routes.Add(routesModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = routesModel.Id, }, routesModel.ToRouteDto());
        }

		//Update Data in the DB based on the ID
		[HttpPut]
        [Route("{id}")]

        public IActionResult Update([FromRoute] int id, [FromBody] UpdateRoutesRequestDto UpdateDto) 
        {
            var routeModel = _context.Routes.FirstOrDefault(x => x.Id == id);
            if (routeModel == null)
            {
                return NotFound();
            }

			routeModel.RouteName = UpdateDto.RouteName;
            routeModel.MinFare = UpdateDto.MinFare;

            _context.SaveChanges();

            return Ok(routeModel.ToRouteDto());

        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var locationModel = _context.Routes.FirstOrDefault(x => x.Id == id);
            if (locationModel == null) 
            {
                return NotFound();
            }

            _context.Routes.Remove(locationModel);

            _context.SaveChanges();

            return NoContent();
        }
    }
}
