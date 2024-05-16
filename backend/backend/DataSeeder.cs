using backend.Data;

namespace backend
{
	public static class DataSeeder
	{
		public static WebApplication Seed(this WebApplication app) 
		{
			using (var scope = app.Services.CreateScope()) 
			{
				using var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

				try 
				{
					context.Database.EnsureCreated();

					var routes = context.Routes.FirstOrDefault();
					var locations = context.Locations.FirstOrDefault();

					if (routes == null)
					{
						context.Routes.AddRange(
							new Models.Routes { RouteName = "SSS Village, Marikina - Cubao, Quezon City", MinFare = 15.0m }
							);
						context.SaveChanges();
					}

					if(locations == null) 
					
						//14.623995, 121.055542 General Romulo Ave. / Aurora Blvd. Intersection, Quezon Cit
						context.Locations.AddRange(
							new Models.Locations { locationName = "Panorama Jeepney Terminal, SSS Village", Latitude = "14.63892", Longitude = "121.12585", CreatedOn = DateTime.Now, RoutesId = 1},
							new Models.Locations { locationName = "Horizon St, Marikina City", Latitude = "14.64025", Longitude = "121.12259", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Lilac St, Marikina City", Latitude = "14.63959", Longitude = "121.12180", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Lilac St, Marikina City", Latitude = "14.637336", Longitude = "121.121611", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Olive St, Marikina City", Latitude = "14.637213", Longitude = "121.119111", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Olive St, Marikina City", Latitude = "14.637471", Longitude = "121.117379", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Russet St / Aquamarine St Intersection, Marikina City", Latitude = "14.638774", Longitude = "121.116335", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Russet St / Sapphire Street Intersection, Marikina City", Latitude = "14.64016", Longitude = "121.116834", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Bronze St / Rainbow St Intersection, Marikina City", Latitude = "14.640695", Longitude = "121.115954", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Azure St / Rainbow St Intersection, Marikina City", Latitude = "14.640980", Longitude = "121.114259", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Rainbow St Near J. M. Panganiban St Intersection, Marikina City", Latitude = "14.641810", Longitude = "121.111697", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Katipunan St, Marikina City", Latitude = "14.642174", Longitude = "121.110631", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "J. Molina St / Katipunan St Intersection", Latitude = "14.645236", Longitude = "121.112120", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "General Ordoñez Ave, Marikina City", Latitude = "14.646343", Longitude = "121.112720", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "General Ordoñez Ave / T. Bugallon St Intersection, Marikina City", Latitude = "14.648420", Longitude = "121.112303", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Bayan-Bayanan Ave., Marikina City", Latitude = "14.650777", Longitude = "121.111905", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Bayan-Bayanan Ave., Marikina City", Latitude = "14.650995", Longitude = "121.110496", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Bayan-Bayanan Ave., Marikina City", Latitude = "14.650680", Longitude = "121.106951", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Bayan-Bayanan Ave., Marikina City", Latitude = "14.650960", Longitude = "121.104149", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "E Rodriguez Ave. / Bayan-Bayanan Avenue Intersection, Marikina City", Latitude = "14.650960", Longitude = "121.104149", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "E Rodriguez Ave., Marikina City", Latitude = "14.649075", Longitude = "121.102972", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "E Rodriguez Ave., Marikina City", Latitude = "14.644700", Longitude = "121.100843", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Aquilina St / E Rodriguez Ave. Intersection, Marikina City", Latitude = "14.642541", Longitude = "121.099799", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "E Rodriguez Ave. / E Mendoza St Intersection, Marikina City", Latitude = "14.640295", Longitude = "121.098762", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Sumulong Hwy., Marikina City", Latitude = "14.635656", Longitude = "121.097341", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "A. Bonifacio Ave., Marikina City", Latitude = "14.636193", Longitude = "121.091032", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "A. Bonifacio Ave., Marikina City", Latitude = "14.635225", Longitude = "121.088349", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Tañong, A. Bonifacio Ave., Marikina City", Latitude = "14.633818", Longitude = "121.085519", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Riverbanks, A. Bonifacio Ave., Marikina City", Latitude = "14.633290", Longitude = "121.084068", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Marcos Hwy / A. Bonifacio Ave., Marikina City", Latitude = "14.632145", Longitude = "121.077886", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Aurora Blvd. / Katipunan Ave., Quezon City", Latitude = "14.631917", Longitude = "121.074364", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "LRT-2 Katipunan/St. Bridget School, Aurora Blvd., Quezon City", Latitude = "14.630980", Longitude = "121.072422", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Asian College of Science and Technology, Aurora Blvd., Quezon City", Latitude = "14.629305", Longitude = "121.068901", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "LRT-2 Anonas, Aurora Blvd., Quezon City", Latitude = "14.628104", Longitude = "121.065194", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "T.I.P Cubao, Aurora Blvd / 20th Avenue, Quezon City, Manila", Latitude = "14.626521", Longitude = "121.060540", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "General Romulo Ave. / Aurora Blvd. Intersection, Quezon City", Latitude = "14.623995", Longitude = "121.055542", CreatedOn = DateTime.Now, RoutesId = 1 }
							);
						context.SaveChanges();
				} 
				catch (Exception) 
				{
					throw;
				}


				return app;
				
			}
		}
	}
}
