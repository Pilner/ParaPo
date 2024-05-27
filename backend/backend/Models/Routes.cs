
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
	public class Routes
	{

        // Items to add in the database
        // Testing 1 to many relationship, where 1 location to many waypoints\
        //Id, Location Name // Route Name (E.g Pureza to Cubao), Minimum Fare, List of waypoints

        public int Id { get; set; }

        public string RouteName { get; set; } = string.Empty;


		[Column(TypeName = "decimal (18,2)")]
		public decimal MinFare { get; set; }

		// One to many Relationships
		public List<Locations> Locations { get; set; } = new List<Locations>();
	}
}
