using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
	public class ApplicationDbContext : DbContext
	{
        public ApplicationDbContext(DbContextOptions dbContextOptions) : base (dbContextOptions)
        {
            
        }

        public DbSet<Location> Location { get; set; }
        public DbSet<Waypoints> Waypoints { get; set; }


    }
}
