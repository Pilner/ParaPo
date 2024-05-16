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
							new Models.Routes { RouteName = "SSS Village, Marikina - Cubao, Quezon City - Stop & Shop, Manila", MinFare = 15.0m }
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
							new Models.Locations { locationName = "Barangka - Marcos Hwy Intersection, A. Bonifacio Ave., Marikina City", Latitude = "14.632222", Longitude = "121.079461", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Marcos Hwy / A. Bonifacio Ave., Marikina City", Latitude = "14.632145", Longitude = "121.077886", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Aurora Blvd. / Katipunan Ave., Quezon City", Latitude = "14.631917", Longitude = "121.074364", CreatedOn = DateTime.Now, RoutesId = 1 },

							new Models.Locations { locationName = "LRT-2 Katipunan/St. Bridget School, Aurora Blvd., Quezon City", Latitude = "14.630980", Longitude = "121.072422", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Asian College of Science and Technology, Aurora Blvd., Quezon City", Latitude = "14.629305", Longitude = "121.068901", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "LRT-2 Anonas, Aurora Blvd., Quezon City", Latitude = "14.628104", Longitude = "121.065194", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "T.I.P Cubao, Aurora Blvd / 20th Avenue, Quezon City, Manila", Latitude = "14.626521", Longitude = "121.060540", CreatedOn = DateTime.Now, RoutesId = 1 },

							new Models.Locations { locationName = "General Romulo Ave. / Aurora Blvd. Intersection, Quezon City", Latitude = "14.623995", Longitude = "121.055542", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Aurora Blvd / General Aguinaldo Ave Intersection / LRT 2 - Cubao Station, Quezon City", Latitude = "14.622924", Longitude = "121.053188", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Aurora Blvd / EDSA Avenue Intersection, Quezon City", Latitude = "14.62172", Longitude = "121.050275", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Aurora Blvd / N Domingo Intersection, Quezon City", Latitude = "14.620046", Longitude = "121.046044", CreatedOn = DateTime.Now, RoutesId = 1 },

							new Models.Locations { locationName = "Aurora Blvd / Betty Go-Belmonte Intersection / LRT 2 - Betty Go Station, Quezon City", Latitude = "14.618222", Longitude = "121.042051", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Saint Paul University Of Quezon City, Aurora Boulevard Cor. Gilmore Avenue, Quezon City", Latitude = "14.616891", Longitude = "121.039998", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Doña M. Hemady Ave / Ramon Magsaysay Blvd Intersection, Quezon City", Latitude = "14.615135", Longitude = "121.037087", CreatedOn = DateTime.Now, RoutesId = 1 },

							new Models.Locations { locationName = "Lrt-2 Gilmore Station, Aurora Blvd, Quezon City", Latitude = "14.613345", Longitude = "121.033684", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Aurora Blvd , Quezon City", Latitude = "14.612159", Longitude = "121.030676", CreatedOn = DateTime.Now, RoutesId = 1 },

							new Models.Locations { locationName = "Aurora Blvd / LRT 2 - J. Ruiz Station, San Juan", Latitude = "14.610846", Longitude = "121.026796", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "S.Veloso / Aurora Blvd Intersection, San Juan", Latitude = "14.609839", Longitude = "121.023691", CreatedOn = DateTime.Now, RoutesId = 1 },

							new Models.Locations { locationName = "Aurora Blvd , San Juan", Latitude = "14.608625", Longitude = "121.021665", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "University of the East Ramon Magsaysay, Aurora Blvd , San Juan", Latitude = "14.607574", Longitude = "121.020512", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Santa Mesa Blvd/ LRT 2 - V.Mapa Station, Manila", Latitude = "14.604273", Longitude = "121.017107", CreatedOn = DateTime.Now, RoutesId = 1 },

							new Models.Locations { locationName = "Magsaysay Blvd / V. Mapa Street Intersection, Manila", Latitude = "14.603012", Longitude = "121.01581", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "V. Mapa Street  / Old Sta. Mesa St Intersection, Manila", Latitude = "14.59963", Longitude = "121.015071", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Old Sta. Mesa St , Manila", Latitude = "14.59963", Longitude = "121.015071", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Valenzuela St ", Latitude = "14.599297", Longitude = "121.014338", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Valenzuela St ", Latitude = "14.59746", Longitude = "121.015692", CreatedOn = DateTime.Now, RoutesId = 1 },

							// Go back starts here at this ID 
							new Models.Locations { locationName = "Valenzuela St - V. Mapa Street Intersection", Latitude = "14.597585", Longitude = "121.017354", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Valenzuela St ", Latitude = "14.599275", Longitude = "121.017116", CreatedOn = DateTime.Now, RoutesId = 1 },

							new Models.Locations { locationName = "V. Mapa Street / Magsaysay Blvd Intersection ", Latitude = "14.602679", Longitude = "121.016071", CreatedOn = DateTime.Now, RoutesId = 1 },

							new Models.Locations { locationName = "Santa Mesa Blvd/ LRT 2 - V.Mapa Station, Manila", Latitude = "14.604273", Longitude = "121.017107", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "University of the East Ramon Magsaysay, Aurora Blvd , San Juan", Latitude = "14.607574", Longitude = "121.020512", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Aurora Blvd , San Juan", Latitude = "14.608625", Longitude = "121.021665", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "S.Veloso / Aurora Blvd Intersection, San Juan", Latitude = "14.609839", Longitude = "121.023691", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Aurora Blvd / LRT 2 - J. Ruiz Station, San Juan", Latitude = "14.610846", Longitude = "121.026796", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Aurora Blvd , Quezon City", Latitude = "14.612159", Longitude = "121.030676", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Lrt-2 Gilmore Station, Aurora Blvd, Quezon City", Latitude = "14.613345", Longitude = "121.033684", CreatedOn = DateTime.Now, RoutesId = 1 },

							new Models.Locations { locationName = "Doña M. Hemady Ave / Ramon Magsaysay Blvd Intersection, Quezon City", Latitude = "14.615135", Longitude = "121.037087", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Saint Paul University Of Quezon City, Aurora Boulevard Cor. Gilmore Avenue, Quezon City", Latitude = "14.616891", Longitude = "121.039998", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Aurora Blvd / Betty Go-Belmonte Intersection / LRT 2 - Betty Go Station, Quezon City", Latitude = "14.618222", Longitude = "121.042051", CreatedOn = DateTime.Now, RoutesId = 1 },

							new Models.Locations { locationName = "Aurora Blvd / N Domingo Intersection, Quezon City", Latitude = "14.620046", Longitude = "121.046044", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Aurora Blvd / EDSA Avenue Intersection, Quezon City", Latitude = "14.62172", Longitude = "121.050275", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Aurora Blvd / General Aguinaldo Ave Intersection / LRT 2 - Cubao Station, Quezon City", Latitude = "14.622924", Longitude = "121.053188", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "General Romulo Ave. / Aurora Blvd. Intersection, Quezon City", Latitude = "14.623995", Longitude = "121.055542", CreatedOn = DateTime.Now, RoutesId = 1 },

							new Models.Locations { locationName = "T.I.P Cubao, Aurora Blvd / 20th Avenue, Quezon City, Manila", Latitude = "14.626521", Longitude = "121.060540", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "LRT-2 Anonas, Aurora Blvd., Quezon City", Latitude = "14.628104", Longitude = "121.065194", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Asian College of Science and Technology, Aurora Blvd., Quezon City", Latitude = "14.629305", Longitude = "121.068901", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "LRT-2 Katipunan/St. Bridget School, Aurora Blvd., Quezon City", Latitude = "14.630980", Longitude = "121.072422", CreatedOn = DateTime.Now, RoutesId = 1 },

							new Models.Locations { locationName = "Aurora Blvd. / Katipunan Ave., Quezon City", Latitude = "14.631917", Longitude = "121.074364", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Marcos Hwy / A. Bonifacio Ave., Marikina City", Latitude = "14.632145", Longitude = "121.077886", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Barangka - Marcos Hwy Intersection, A. Bonifacio Ave., Marikina City", Latitude = "14.632222", Longitude = "121.079461", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Riverbanks, A. Bonifacio Ave., Marikina City", Latitude = "14.633290", Longitude = "121.084068", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Tañong, A. Bonifacio Ave., Marikina City", Latitude = "14.633818", Longitude = "121.085519", CreatedOn = DateTime.Now, RoutesId = 1 },

							new Models.Locations { locationName = "A. Bonifacio Ave., Marikina City", Latitude = "14.635225", Longitude = "121.088349", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "A. Bonifacio Ave., Marikina City", Latitude = "14.636193", Longitude = "121.091032", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Sumulong Hwy., Marikina City", Latitude = "14.635656", Longitude = "121.097341", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "E Rodriguez Ave. / E Mendoza St Intersection, Marikina City", Latitude = "14.640295", Longitude = "121.098762", CreatedOn = DateTime.Now, RoutesId = 1 },

							new Models.Locations { locationName = "Aquilina St / E Rodriguez Ave. Intersection, Marikina City", Latitude = "14.642541", Longitude = "121.099799", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "E Rodriguez Ave., Marikina City", Latitude = "14.644700", Longitude = "121.100843", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "E Rodriguez Ave., Marikina City", Latitude = "14.649075", Longitude = "121.102972", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "E Rodriguez Ave. / Bayan-Bayanan Avenue Intersection, Marikina City", Latitude = "14.650960", Longitude = "121.104149", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Bayan-Bayanan Ave., Marikina City", Latitude = "14.650960", Longitude = "121.104149", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Bayan-Bayanan Ave., Marikina City", Latitude = "14.650680", Longitude = "121.106951", CreatedOn = DateTime.Now, RoutesId = 1 },


							new Models.Locations { locationName = "Bayan-Bayanan Ave., Marikina City", Latitude = "14.650995", Longitude = "121.110496", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Bayan-Bayanan Ave., Marikina City", Latitude = "14.650777", Longitude = "121.111905", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "General Ordoñez Ave / T. Bugallon St Intersection, Marikina City", Latitude = "14.648420", Longitude = "121.112303", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "General Ordoñez Ave, Marikina City", Latitude = "14.646343", Longitude = "121.112720", CreatedOn = DateTime.Now, RoutesId = 1 },

							new Models.Locations { locationName = "J. Molina St / Katipunan St Intersection", Latitude = "14.645236", Longitude = "121.112120", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Katipunan St, Marikina City", Latitude = "14.642174", Longitude = "121.110631", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Rainbow St Near J. M. Panganiban St Intersection, Marikina City", Latitude = "14.641810", Longitude = "121.111697", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Azure St / Rainbow St Intersection, Marikina City", Latitude = "14.640980", Longitude = "121.114259", CreatedOn = DateTime.Now, RoutesId = 1 },

							new Models.Locations { locationName = "Bronze St / Rainbow St Intersection, Marikina City", Latitude = "14.640695", Longitude = "121.115954", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Russet St / Sapphire Street Intersection, Marikina City", Latitude = "14.64016", Longitude = "121.116834", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Russet St / Aquamarine St Intersection, Marikina City", Latitude = "14.638774", Longitude = "121.116335", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Olive St, Marikina City", Latitude = "14.637471", Longitude = "121.117379", CreatedOn = DateTime.Now, RoutesId = 1 },

							new Models.Locations { locationName = "Olive St, Marikina City", Latitude = "14.637213", Longitude = "121.119111", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Lilac St, Marikina City", Latitude = "14.637336", Longitude = "121.121611", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Lilac St, Marikina City", Latitude = "14.63959", Longitude = "121.12180", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Horizon St, Marikina City", Latitude = "14.64025", Longitude = "121.12259", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Panorama Jeepney Terminal, SSS Village", Latitude = "14.63892", Longitude = "121.12585", CreatedOn = DateTime.Now, RoutesId = 1 }

							// Return to Terminal SSS Village


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
