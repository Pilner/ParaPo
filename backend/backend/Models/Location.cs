
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
	public class Location
	{

        // Items to add in the database
        // Testing 1 to many relationship, where 1 location to many waypoints\
        //Id, Location Name // Route Name (E.g Pureza to Cubao), Minimum Fare, List of waypoints

        public int Id { get; set; }

        public string LocName { get; set; } = string.Empty;


		[Column(TypeName = "decimal (18,2)")]
		public decimal MinFare { get; set; }

		// One to many Relationships
		public List<Waypoints> Waypoints { get; set; } = new List<Waypoints>();
	}
}
