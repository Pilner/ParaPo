using backend.Data;
using backend.Dtos.Location;
using backend.Mappers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/location")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public LocationController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get all items in the DB
        [HttpGet]
        public IActionResult GetAll()
        {
            var locations = _context.Location.ToList()
                .Select(s => s.ToLocationDto());

            return Ok(locations);
        }

        //Get a single item in the DB based on the ID
        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var location = _context.Location.Find(id);

            if (location == null)
            {
                return NotFound();
            }

            return Ok(location.ToLocationDto());
        }

        // Add new Items
        [HttpPost]

        public IActionResult Create([FromBody] CreateLocationRequestDto locationDto)
        {
            var locationModel = locationDto.ToLocationFromCreateDto();
            _context.Location.Add(locationModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = locationModel.Id, }, locationModel.ToLocationDto());
        }

		//Update Data in the DB based on the ID
		[HttpPut]
        [Route("{id}")]

        public IActionResult Update([FromRoute] int id, [FromBody] UpdateLocationRequestDto UpdateDto) 
        {
            var locationModel = _context.Location.FirstOrDefault(x => x.Id == id);
            if (locationModel == null)
            {
                return NotFound();
            }

            locationModel.LocName = UpdateDto.LocName;
            locationModel.MinFare = UpdateDto.MinFare;

            _context.SaveChanges();

            return Ok(locationModel.ToLocationDto());

        }
    }
}
