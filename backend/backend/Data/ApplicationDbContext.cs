using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
	public class ApplicationDbContext : DbContext
	{
        public ApplicationDbContext(DbContextOptions dbContextOptions) : base (dbContextOptions)
        {
            
        }

        public DbSet<Routes> Routes { get; set; }
        public DbSet<Locations> Locations { get; set; }


    }
}
