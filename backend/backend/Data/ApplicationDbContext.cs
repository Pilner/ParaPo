using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace backend.Data
{
    // This will Setup the backend
	public class ApplicationDbContext : DbContext
	{
        public ApplicationDbContext(DbContextOptions dbContextOptions) : base (dbContextOptions)
        {
            
        }

        public DbSet<Routes> Routes { get; set; }
        public DbSet<Locations> Locations { get; set; }
	}
}
