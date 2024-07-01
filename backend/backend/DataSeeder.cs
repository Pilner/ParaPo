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
							new Models.Routes { RouteName = "SSS Village, Marikina - Cubao, Quezon City - Stop & Shop, Manila", Category = "Jeep", MinFare = 15.0m },
							new Models.Routes { RouteName = "Montalban - Cubao via Aurora Blvd", Category = "Jeep", MinFare = 15.0m },
							new Models.Routes { RouteName = "Montalban Heights(Rizal) - Litex", Category = "Jeep", MinFare = 15.0m },
							new Models.Routes { RouteName = "Marikina - San Mateo (Banaba)", Category = "Jeep", MinFare = 13.0m },
							new Models.Routes { RouteName = "EDSA/Shaw Blvd-E.R Ort",  Category = "Jeep", MinFare = 13.0m },
							new Models.Routes { RouteName = "Gate 5 - Greenhills Shopping Center Loop", Category = "Jeep", MinFare = 13.0m },
							new Models.Routes { RouteName = "Sta. Lucia - Binangonan", Category = "Jeep", MinFare = 13.0m },
							new Models.Routes { RouteName = "Edsa/Shaw Central-Pateros", Category = "Jeep", MinFare = 13.0m },
							new Models.Routes { RouteName = "Blumentritt-Retiro", Category = "Jeep", MinFare = 13.0m },
							new Models.Routes { RouteName = "Blumentritt-Balut", Category = "Jeep", MinFare = 13.0m },
							new Models.Routes { RouteName = "Cabrera - Libertad", Category = "Jeep", MinFare = 13.0m },
							new Models.Routes { RouteName = "Balintawak - PUC via Baesa", Category = "Jeep", MinFare = 13.0m },
							new Models.Routes { RouteName = "SM North EDSA-Luzon Ave (Puregold)", Category = "Jeep", MinFare = 13.0m },
							new Models.Routes { RouteName = "Pantranco-Proj. 2 & 3 via Kamuning", Category = "Jeep", MinFare = 13.0m },
							new Models.Routes { RouteName = "Buendia-MOA", Category = "Jeep", MinFare = 13.0m },

							// Train routes
							new Models.Routes { RouteName = "Light Rail Transit 2 (LRT2)", Category = "Train", MinFare = 13.0m },
							new Models.Routes { RouteName = "Light Rail Transit 1 (LRT1)", Category = "Train", MinFare = 13.0m }

							);
						context.SaveChanges();
					}

					if(locations == null)

						// Template
						//new Models.Locations { locationName = "", Latitude = "", Longitude = "", CreatedOn = DateTime.Now, RoutesId = },
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
							new Models.Locations { locationName = "Teresa, Old Sta. Mesa St , Manila", Latitude = "14.60096", Longitude = "121.01309", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Old Sta. Mesa St , Manila - Magsaysay Blvd", Latitude = "14.60201", Longitude = "121.01198", CreatedOn = DateTime.Now, RoutesId = 1 },
							new Models.Locations { locationName = "Magsaysay Blvd / V. Mapa Street Intersection, Manila", Latitude = "14.603012", Longitude = "121.01581", CreatedOn = DateTime.Now, RoutesId = 1 },

							// Go back starts here at this ID 

							// Return to Terminal SSS Village

							//Montalban - Cubao Data
							new Models.Locations { locationName = "Luvers, San Rafael, Montalban", Latitude = "14.73537", Longitude = "121.15431", CreatedOn = DateTime.Now, RoutesId = 2},
							new Models.Locations { locationName = "Total , San Rafae l, Montalban", Latitude = "14.73532", Longitude = "121.15219", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Balite, San Rafael, Montalban", Latitude = "14.7355", Longitude = "121.1464", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Bayan, Montalban", Latitude = "14.73241", Longitude = "121.14523", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Bayan, Montalban", Latitude = "14.73241", Longitude = "121.14523", CreatedOn = DateTime.Now, RoutesId = 2 },

							new Models.Locations { locationName = "J.P Rizal Avenue", Latitude = "14.72772", Longitude = "121.14369", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Manggahan, Montalban", Latitude = "14.7245", Longitude = "121.1423", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Burgos, Montalban", Latitude = "14.71993", Longitude = "121.13916", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "A. Mabini Street", Latitude = "14.7143", Longitude = "121.1357", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Maly, San Mateo", Latitude = "14.7103", Longitude = "121.1332", CreatedOn = DateTime.Now, RoutesId = 2 },

							new Models.Locations { locationName = "Guinayang, San Mateo", Latitude = "14.7074", Longitude = "121.1306", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "General A.Luna Street", Latitude = "14.7056", Longitude = "121.1277", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Dulong Bayan, San Mateo", Latitude = "14.7011", Longitude = "121.1254", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Guitnang Bayan, San Mateo", Latitude = "14.6983", Longitude = "121.1224", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Santa Ana, San Mateo", Latitude = "14.692", Longitude = "121.117", CreatedOn = DateTime.Now, RoutesId = 2 },

							new Models.Locations { locationName = "Ampid II, San Mateo", Latitude = "14.6878", Longitude = "121.1165", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Ampid Bridge, San Mateo", Latitude = "14.68511", Longitude = "121.11611", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "SM City San Mateo, San Mateo", Latitude = "14.68027", Longitude = "121.11377", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Banaba, Marikina", Latitude = "14.67591", Longitude = "121.11026", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Banaba - Nangka Bridge, Marikina", Latitude = "14.674", Longitude = "121.10957", CreatedOn = DateTime.Now, RoutesId = 2 },

							new Models.Locations { locationName = "Nangka, Marikina", Latitude = "14.67031", Longitude = "121.10854", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Marikina Greenheights, Marikina", Latitude = "14.66697", Longitude = "121.10749", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Tumana, Marikina", Latitude = "14.66078", Longitude = "121.10527", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Concepcion, Marikina", Latitude = "14.6507", Longitude = "121.1029", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "J.P Rizal Street", Latitude = "14.6494", Longitude = "121.0999", CreatedOn = DateTime.Now, RoutesId = 2 },

							new Models.Locations { locationName = "Emerald Village, Marikina", Latitude = "14.6437", Longitude = "121.0955", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "J.P Rizal Street", Latitude = "14.6394", Longitude = "121.0942", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "J.P. Rizal Street - Jesus Dela Peña", Latitude = "14.63595", Longitude = "121.09442", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Jesus Dela Peña - A. Bonifacio Avenue", Latitude = "14.63613", Longitude = "121.09168", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Tañong, Marikina", Latitude = "14.6341", Longitude = "121.0861", CreatedOn = DateTime.Now, RoutesId = 2 },

							new Models.Locations { locationName = "Barangka, Marikina", Latitude = "14.6327", Longitude = "121.0822", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "A. Bonifacio Avenue ", Latitude = "14.63233", Longitude = "121.08059", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "A. Bonifacio Avenue - Marcos Hwy", Latitude = "14.63215", Longitude = "121.07795", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Marcos Hwy", Latitude = "14.6324", Longitude = "121.07529", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "LRT 2 Katipunan Station", Latitude = "14.63138", Longitude = "121.07326", CreatedOn = DateTime.Now, RoutesId = 2 },

							new Models.Locations { locationName = "Aurora Blvd. - Asian College of Science and Technology", Latitude = "14.62932", Longitude = "121.06899", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "LRT 2 Anonas Station", Latitude = "14.628", Longitude = "121.06412", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Aurora Blvd. - Technological Institute of the Philippines (TIP) ", Latitude = "14.6268", Longitude = "121.06118", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Aurora Blvd. - 15th Ave. Intersection ", Latitude = "14.62497", Longitude = "121.0572", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Aurora Blvd. - Gen. Romulo Ave. Intersection", Latitude = "14.62416", Longitude = "121.05544", CreatedOn = DateTime.Now, RoutesId = 2 },


							new Models.Locations { locationName = "Gen. Romulo Ave. ", Latitude = "14.62117", Longitude = "121.05657", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Gen. Romulo Ave.  - Gen. MacArthur Ave", Latitude = "14.62073", Longitude = "121.05639", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Gen. MacArthur Ave - Times Square Avenue - Araneta Cubao Bus Station ", Latitude = "14.62152", Longitude = "121.05513", CreatedOn = DateTime.Now, RoutesId = 2 },

							// Returning
							new Models.Locations { locationName = "Times Square Avenue", Latitude = "14.62237", Longitude = "121.05464", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Times Square Avenue - Aurora Blvd", Latitude = "14.62316", Longitude = "121.05398", CreatedOn = DateTime.Now, RoutesId = 2 },
							new Models.Locations { locationName = "Aurora Blvd. - Gen. Romulo Ave. Intersection", Latitude = "14.62416", Longitude = "121.05544", CreatedOn = DateTime.Now, RoutesId = 2 },

							//Montalban Heights(Rizal) - Litex
							//new Models.Locations { locationName = "", Latitude = "", Longitude = "", CreatedOn = DateTime.Now, RoutesId = 3},

							new Models.Locations { locationName = "Montalban Heights", Latitude = "14.7478", Longitude = "121.1235", CreatedOn = DateTime.Now, RoutesId = 3 },
							new Models.Locations { locationName = "Mayon Avenue, Rodriguez / Crossing", Latitude = "14.7348", Longitude = "121.1268", CreatedOn = DateTime.Now, RoutesId = 3 },
							new Models.Locations { locationName = "Payatas Road, Quezon City", Latitude = "14.7180", Longitude = "121.1009", CreatedOn = DateTime.Now, RoutesId = 3 },
							new Models.Locations { locationName = "Payatas Road, Quezon City", Latitude = "14.7163", Longitude = "121.0997", CreatedOn = DateTime.Now, RoutesId = 3 },
							new Models.Locations { locationName = "Payatas Road, Quezon City", Latitude = "14.7148", Longitude = "121.0971", CreatedOn = DateTime.Now, RoutesId = 3 },
							new Models.Locations { locationName = "Payatas Road near Molave Street, Quezon City", Latitude = "14.7139", Longitude = "121.0948", CreatedOn = DateTime.Now, RoutesId = 3 },
							new Models.Locations { locationName = "Payatas Road, Quezon City", Latitude = "14.7144", Longitude = "121.0923", CreatedOn = DateTime.Now, RoutesId = 3 },
							new Models.Locations { locationName = "Payatas Road, Quezon City", Latitude = "14.7143", Longitude = "121.0905", CreatedOn = DateTime.Now, RoutesId = 3 },
							new Models.Locations { locationName = "Payatas Road, Quezon City", Latitude = "14.7113", Longitude = "121.0907", CreatedOn = DateTime.Now, RoutesId = 3 },
							new Models.Locations { locationName = "Manila Gravel Pit Road / Makisig Intersection, Quezon City", Latitude = "14.7093", Longitude = "121.0908", CreatedOn = DateTime.Now, RoutesId = 3 },
							new Models.Locations { locationName = "Manila Gravel Pit Road, Quezon City", Latitude = "14.7060", Longitude = "121.0881", CreatedOn = DateTime.Now, RoutesId = 3 },
							new Models.Locations { locationName = "Payatas Road, Quezon City", Latitude = "14.7031", Longitude = "121.0890", CreatedOn = DateTime.Now, RoutesId = 3 },
							new Models.Locations { locationName = "Litex Market, Commonwealth Avenue, Quezon City", Latitude = "14.7013", Longitude = "121.0868", CreatedOn = DateTime.Now, RoutesId = 3 },



							//Marikina - San Mateo (Banaba)

							//new Models.Locations { locationName = "", Latitude = "", Longitude = "", CreatedOn = DateTime.Now, RoutesId = 4},

							new Models.Locations { locationName = "Freedom Park, Marikina City", Latitude = "14.6328", Longitude = "121.0977", CreatedOn = DateTime.Now, RoutesId = 4 },
							new Models.Locations { locationName = "Shoe Ave., Marikina City", Latitude = "14.6404", Longitude = "121.0979", CreatedOn = DateTime.Now, RoutesId = 4 },
							new Models.Locations { locationName = "Daang Bakal / C. A. Santos St Intersection, Marikina City", Latitude = "14.6410", Longitude = "121.0942", CreatedOn = DateTime.Now, RoutesId = 4 },
							new Models.Locations { locationName = "J. P. Rizal St, Marikina City", Latitude = "14.6425", Longitude = "121.0947", CreatedOn = DateTime.Now, RoutesId = 4 },
							new Models.Locations { locationName = "St. Victoria Hospital, Marikina City", Latitude = "14.6423", Longitude = "121.0945", CreatedOn = DateTime.Now, RoutesId = 4 },

							new Models.Locations { locationName = "J. P. Rizal St, Marikina City", Latitude = "14.6475", Longitude = "121.0969", CreatedOn = DateTime.Now, RoutesId = 4 },
							new Models.Locations { locationName = "Roosevelt College, J. P. Rizal St., Marikina City", Latitude = "14.6492", Longitude = "121.0984", CreatedOn = DateTime.Now, RoutesId = 4 },
							new Models.Locations { locationName = "J. P. Rizal St., Marikina City", Latitude = "14.6494", Longitude = "121.1015", CreatedOn = DateTime.Now, RoutesId = 4 },
							new Models.Locations { locationName = "J. P. Rizal cor. Bayan-Bayanan Ave., Marikina City", Latitude = "14.6507", Longitude = "121.1029", CreatedOn = DateTime.Now, RoutesId = 4 },
							new Models.Locations { locationName = "J. P. Rizal St. cor. Bagong Farmers Ave., Tumana, Marikina City", Latitude = "14.6528", Longitude = "121.1032", CreatedOn = DateTime.Now, RoutesId = 4 },

							new Models.Locations { locationName = "J. P. Rizal St, Marikina City", Latitude = "14.6613", Longitude = "121.1054", CreatedOn = DateTime.Now, RoutesId = 4 },
							new Models.Locations { locationName = "J.P. Rizal cor. Fairlane, Marikina City", Latitude = "14.6633", Longitude = "121.1063", CreatedOn = DateTime.Now, RoutesId = 4 },
							new Models.Locations { locationName = "J. P. Rizal St / Egypt Street Intersection, Marikina City", Latitude = "14.6650", Longitude = "121.1069", CreatedOn = DateTime.Now, RoutesId = 4 },
							new Models.Locations { locationName = "J. P. Rizal St / Japan Avenue Intersection, Marikina City", Latitude = "14.6670", Longitude = "121.1075", CreatedOn = DateTime.Now, RoutesId = 4 },
							new Models.Locations { locationName = "J. P. Rizal St / Buen-Mar Ave Intersection, Marikina City, Manila", Latitude = "14.6699", Longitude = "121.1084", CreatedOn = DateTime.Now, RoutesId = 4 },

							new Models.Locations { locationName = "Nangka, J.P. Rizal, Marikina City", Latitude = "14.6728", Longitude = "121.1092", CreatedOn = DateTime.Now, RoutesId = 4 },
							new Models.Locations { locationName = "J. P. Rizal St, Banaba, San Mateo, Rizal", Latitude = "14.6753", Longitude = "121.1099", CreatedOn = DateTime.Now, RoutesId = 4 },


							//EDSA/Shaw Blvd-E.R Ort
							//new Models.Locations { locationName = "", Latitude = "", Longitude = "", CreatedOn = DateTime.Now, RoutesId = 5},
							new Models.Locations { locationName = "Mayflower, Mandaluyong City", Latitude = "14.5778", Longitude = "121.0536", CreatedOn = DateTime.Now, RoutesId = 5 },
							new Models.Locations { locationName = "Tropical Hut/10Q, Shaw Blvd.", Latitude = "14.5765", Longitude = "121.0590", CreatedOn = DateTime.Now, RoutesId = 5 },
							new Models.Locations { locationName = "Shaw Blvd., Pasig City", Latitude = "14.5752", Longitude = "121.0605", CreatedOn = DateTime.Now, RoutesId = 5 },
							new Models.Locations { locationName = "Shaw/San Roque, Pasig City", Latitude = "14.5721", Longitude = "121.0643", CreatedOn = DateTime.Now, RoutesId = 5 },
							new Models.Locations { locationName = "Shaw Blvd., Pasig City", Latitude = "14.5706", Longitude = "121.0661", CreatedOn = DateTime.Now, RoutesId = 5 },

							new Models.Locations { locationName = "Capitol 8/San Ignacio St., Pasig Blvd., Pasig City", Latitude = "14.5675", Longitude = "121.0660", CreatedOn = DateTime.Now, RoutesId = 5 },
							new Models.Locations { locationName = "BDO Pasig Blvd.", Latitude = "14.5655", Longitude = "121.0657", CreatedOn = DateTime.Now, RoutesId = 5 },
							new Models.Locations { locationName = "Pineda/Rizal Medical Center, Pasig Blvd., Pasig City", Latitude = "14.5636", Longitude = "121.0654", CreatedOn = DateTime.Now, RoutesId = 5 },
							new Models.Locations { locationName = "Pasig Blvd / C-5 Intersection , Pasig City, Manila", Latitude = "14.5629", Longitude = "121.0681", CreatedOn = DateTime.Now, RoutesId = 5 },
							new Models.Locations { locationName = "C-5", Latitude = "14.5643", Longitude = "121.0699", CreatedOn = DateTime.Now, RoutesId = 5 },

							new Models.Locations { locationName = "Mary Immaculate Hospital, Pasig City", Latitude = "14.5692", Longitude = "121.0711", CreatedOn = DateTime.Now, RoutesId = 5 },
							new Models.Locations { locationName = "Eulogio Rodriguez Jr. Ave. / Danny Flo St, Pasig City", Latitude = "14.5704", Longitude = "121.0713", CreatedOn = DateTime.Now, RoutesId = 5 },
							new Models.Locations { locationName = "Eulogio Rodriguez Jr. Ave., Pasig City", Latitude = "14.5726", Longitude = "121.0719", CreatedOn = DateTime.Now, RoutesId = 5 },
							new Models.Locations { locationName = "Eulogio Rodriguez Jr. Ave., Pasig City", Latitude = "14.5759", Longitude = "121.0728", CreatedOn = DateTime.Now, RoutesId = 5 },
							new Models.Locations { locationName = "Eulogio Rodriguez Jr. Ave. / Lanuza Ave., Pasig City", Latitude = "14.5784", Longitude = "121.0741", CreatedOn = DateTime.Now, RoutesId = 5 },

							new Models.Locations { locationName = "Eulogio Rodriguez Jr Ave., Pasig City", Latitude = "14.5818", Longitude = "121.0763", CreatedOn = DateTime.Now, RoutesId = 5 },
							new Models.Locations { locationName = "Eulogio Rodriguez Jr Ave. / Doña Julia Vargas Ave. Intersection, Pasig City", Latitude = "14.5825", Longitude = "121.0769", CreatedOn = DateTime.Now, RoutesId = 5 },
							new Models.Locations { locationName = "JP Raceway, Pasig City", Latitude = "14.5885", Longitude = "121.0800", CreatedOn = DateTime.Now, RoutesId = 5 },
							new Models.Locations { locationName = "Frontera, Ortigas Ave. cor. C-5, Pasig City", Latitude = "14.5898", Longitude = "121.0784", CreatedOn = DateTime.Now, RoutesId = 5 },

							//Gate 5 - Greenhills Shopping Center Loop
							//new Models.Locations { locationName = "", Latitude = "", Longitude = "", CreatedOn = DateTime.Now, RoutesId = 6},
							new Models.Locations { locationName = "Greenhills Shopping Center Terminal", Latitude = "14.6006", Longitude = "121.0487", CreatedOn = DateTime.Now, RoutesId = 6 },
							new Models.Locations { locationName = "Annapolis, San Juan", Latitude = "14.6047", Longitude = "121.0536", CreatedOn = DateTime.Now, RoutesId = 6 },
							new Models.Locations { locationName = "Gate 5-Greenhills Terminal, Annapolis", Latitude = "14.6059", Longitude = "121.0562", CreatedOn = DateTime.Now, RoutesId = 6 },


							//Sta. Lucia - Binangonan
							//new Models.Locations { locationName = "", Latitude = "", Longitude = "", CreatedOn = DateTime.Now, RoutesId = 7},
							new Models.Locations { locationName = "Felix Ave., Cainta", Latitude = "14.5923", Longitude = "121.1125", CreatedOn = DateTime.Now, RoutesId = 7 },
							new Models.Locations { locationName = "Felix Ave., Cainta", Latitude = "14.5895", Longitude = "121.1143", CreatedOn = DateTime.Now, RoutesId = 7 },
							new Models.Locations { locationName = "Felix Ave., Cainta", Latitude = "14.5874", Longitude = "121.1148", CreatedOn = DateTime.Now, RoutesId = 7 },
							new Models.Locations { locationName = "Ortigas Avenue Extension, Cainta", Latitude = "14.5860", Longitude = "121.1162", CreatedOn = DateTime.Now, RoutesId = 7 },
							new Models.Locations { locationName = "Sunset Drive Footbridge, Ortigas Avenue Extension, Cainta", Latitude = "14.5837", Longitude = "121.1237", CreatedOn = DateTime.Now, RoutesId = 7 },
							new Models.Locations { locationName = "Ortigas Avenue Extension, Cainta", Latitude = "14.5829", Longitude = "121.1265", CreatedOn = DateTime.Now, RoutesId = 7 },
							new Models.Locations { locationName = "Ortigas Avenue Extension, Taytay, Rizal", Latitude = "14.5810", Longitude = "121.1321", CreatedOn = DateTime.Now, RoutesId = 7 },
							new Models.Locations { locationName = "Coco Demer St / Ortigas Avenue Extension, Tatay, Manila", Latitude = "14.5792", Longitude = "121.1381", CreatedOn = DateTime.Now, RoutesId = 7 },

							//Edsa/Shaw Central-Pateros
							//new Models.Locations { locationName = "", Latitude = "", Longitude = "", CreatedOn = DateTime.Now, RoutesId = 8},

							new Models.Locations { locationName = "EDSA Central Jeepney Terminal, Mandaluyong City", Latitude = "14.5803", Longitude = "121.0545", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "Shaw Blvd., Mandaluyong City", Latitude = "14.5796", Longitude = "121.0554", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "Tropical Hut/10Q, Shaw Blvd.", Latitude = "14.5764", Longitude = "121.0591", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "Hong Kong Noodles & Dimsum, Shaw Blvd., Pasig City", Latitude = "14.5756", Longitude = "121.0602", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "Shaw Blvd., Pasig City", Latitude = "14.5746", Longitude = "121.0613", CreatedOn = DateTime.Now, RoutesId = 8 },

							new Models.Locations { locationName = "Kapitolyo, Pasig City", Latitude = "14.5741", Longitude = "121.0619", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "Shaw/San Roque, Pasig City", Latitude = "14.5720", Longitude = "121.0644", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "Shaw Blvd., Pasig City", Latitude = "14.5707", Longitude = "121.0659", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "Capitol 8/San Ignacio St., Pasig Blvd., Pasig City", Latitude = "14.5675", Longitude = "121.0660", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "BDO Pasig Blvd.", Latitude = "14.5658", Longitude = "121.0657", CreatedOn = DateTime.Now, RoutesId = 8 },

							new Models.Locations { locationName = "Pineda/Rizal Medical Center, Pasig Blvd., Pasig City", Latitude = "14.5639", Longitude = "121.0654", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "Pasig Blvd / C-5 Intersection , Pasig City, Manila", Latitude = "14.5629", Longitude = "121.0680", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "C-5", Latitude = "14.5646", Longitude = "121.0700", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "Pasig Boulevard Extension, Pasig City", Latitude = "14.5661", Longitude = "121.0707", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "Pasig Blvd. Ext.", Latitude = "14.5660", Longitude = "121.0760", CreatedOn = DateTime.Now, RoutesId = 8 },

							new Models.Locations { locationName = "Metrobank", Latitude = "14.5651", Longitude = "121.0759", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "A. Mabini St / Blumentritt St, Pasig City", Latitude = "14.5633", Longitude = "121.0760", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "A. Mabini St, Pasig City", Latitude = "14.5624", Longitude = "121.0761", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "Plaza Rizal, Pasig City", Latitude = "14.5605", Longitude = "121.0766", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "Plaza Rizal, Pasig City", Latitude = "14.5604", Longitude = "121.0761", CreatedOn = DateTime.Now, RoutesId = 8 },

							new Models.Locations { locationName = "P. Burgos, Pasig City", Latitude = "14.5596", Longitude = "121.0738", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "Dr. Garcia, Pasig City", Latitude = "14.5575", Longitude = "121.0749", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "A. Luna St / Dr Garcia Intersection , Pasig City, Manila", Latitude = "14.5569", Longitude = "121.0758", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "A. Luna St, Pasig City", Latitude = "14.5555", Longitude = "121.0760", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "A. Luna St, Pasig City", Latitude = "14.5519", Longitude = "121.0748", CreatedOn = DateTime.Now, RoutesId = 8 },

							new Models.Locations { locationName = "M. Almeda, Pateros", Latitude = "14.5510", Longitude = "121.0739", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "Caltex Pateros, R. Jabson Street, Pateros", Latitude = "14.5503", Longitude = "121.0733", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "M. Almeda, Pateros", Latitude = "14.5500", Longitude = "121.0730", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "M. Almeda, Pateros", Latitude = "14.5479", Longitude = "121.0719", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "M. Almeda, Pateros", Latitude = "14.5470", Longitude = "121.0704", CreatedOn = DateTime.Now, RoutesId = 8 },

							new Models.Locations { locationName = "M. Almeda, Pateros", Latitude = "14.5445", Longitude = "121.0680", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "M. Almeda / G. de Borja Intersection, Pateros", Latitude = "14.5430", Longitude = "121.0672", CreatedOn = DateTime.Now, RoutesId = 8 },
							new Models.Locations { locationName = "Villa Monica Resort, M. Almeda, Pateros", Latitude = "14.5408", Longitude = "121.0672", CreatedOn = DateTime.Now, RoutesId = 8 },

							//Blumentritt-Retiro
							//new Models.Locations { locationName = "", Latitude = "", Longitude = "", CreatedOn = DateTime.Now, RoutesId = 9},

							new Models.Locations { locationName = "N. S. Amoranto Sr. Avenue / Don Jose Intersection, Quezon City", Latitude = "14.6357", Longitude = "121.0084", CreatedOn = DateTime.Now, RoutesId = 9 },
							new Models.Locations { locationName = "N. S. Amoranto Sr. Avenue / Don Jose Intersection, Quezon City", Latitude = "14.6354", Longitude = "121.0077", CreatedOn = DateTime.Now, RoutesId = 9 },
							new Models.Locations { locationName = "N. S. Amoranto Sr. Avenue / Sto. Domingo Avenue Intersection, Quezon City", Latitude = "14.6348", Longitude = "121.0063", CreatedOn = DateTime.Now, RoutesId = 9 },
							new Models.Locations { locationName = "N. S. Amoranto Sr. Avenue / Biak an Bato Intersection, Quezon City", Latitude = "14.6339", Longitude = "121.0044", CreatedOn = DateTime.Now, RoutesId = 9 },
							new Models.Locations { locationName = "N. S. Amoranto Sr. Avenue / Banawe Avenue Intersection, Quezon City", Latitude = "14.6329", Longitude = "121.0020", CreatedOn = DateTime.Now, RoutesId = 9 },

							new Models.Locations { locationName = "N. S. Amoranto Sr. Avenue, Quezon City", Latitude = "14.6317", Longitude = "120.9995", CreatedOn = DateTime.Now, RoutesId = 9 },
							new Models.Locations { locationName = "N. S. Amoranto Sr. Avenue, Quezon City", Latitude = "14.6305", Longitude = "120.9969", CreatedOn = DateTime.Now, RoutesId = 9 },
							new Models.Locations { locationName = "Norberto S. Amoranto Street / Bulasan Intersection, Quezon City", Latitude = "14.6295", Longitude = "120.9952", CreatedOn = DateTime.Now, RoutesId = 9 },
							new Models.Locations { locationName = "Norberto S. Amoranto Street / Iba Intersection, Quezon City", Latitude = "14.6273", Longitude = "120.9928", CreatedOn = DateTime.Now, RoutesId = 9 },
							new Models.Locations { locationName = "Norberto S. Amoranto Street / Calavite Intersection, Quezon City", Latitude = "14.6258", Longitude = "120.9911", CreatedOn = DateTime.Now, RoutesId = 9 },

							new Models.Locations { locationName = "Ferdinand Blumentritt / Felix Huertas Intersection, Quezon City", Latitude = "14.6237", Longitude = "120.9848", CreatedOn = DateTime.Now, RoutesId = 9 },
							new Models.Locations { locationName = "Blumentritt / Rizal Ave. Intersection, City of Manila", Latitude = "14.6231", Longitude = "120.9833", CreatedOn = DateTime.Now, RoutesId = 9 },

							//Blumentritt-Balut
							//new Models.Locations { locationName = "", Latitude = "", Longitude = "", CreatedOn = DateTime.Now, RoutesId = 10},
							new Models.Locations { locationName = "North Bay Boulevard / Rodriguez Intersection, Tondo", Latitude = "14.6298", Longitude = "120.9647", CreatedOn = DateTime.Now, RoutesId = 10 },
							new Models.Locations { locationName = "H. Lopez Blvd. / Guidote Intersection, Tondo", Latitude = "14.6273", Longitude = "120.9658", CreatedOn = DateTime.Now, RoutesId = 10 },
							new Models.Locations { locationName = "Immaculate Conception Academy, North Bay Blvd., City of Manila", Latitude = "14.6242", Longitude = "120.9678", CreatedOn = DateTime.Now, RoutesId = 10 },
							new Models.Locations { locationName = "Manila Faith Assembly of God, Juan Luna, City of Manila", Latitude = "14.6222", Longitude = "120.9719", CreatedOn = DateTime.Now, RoutesId = 10 },
							new Models.Locations { locationName = "Gagalangin Fire Station, Juan Luna, City of Manila", Latitude = "14.6254", Longitude = "120.9730", CreatedOn = DateTime.Now, RoutesId = 10 },
							new Models.Locations { locationName = "F. Benitez Elementary School, Juan Luna, Caloocan City", Latitude = "14.6267", Longitude = "120.9734", CreatedOn = DateTime.Now, RoutesId = 10 },
							new Models.Locations { locationName = "Antipolo St., City of Manila", Latitude = "14.6235", Longitude = "120.9773", CreatedOn = DateTime.Now, RoutesId = 10 },

							//Cabrera - Libertad
							//new Models.Locations { locationName = "", Latitude = "", Longitude = "", CreatedOn = DateTime.Now, RoutesId = 11},
							new Models.Locations { locationName = "Antonio Arnaiz Ave / P.Zamora Intersection, Manila", Latitude = "14.5481", Longitude = "121.0009", CreatedOn = DateTime.Now, RoutesId = 11 },
							new Models.Locations { locationName = "Tramo, Lungsod ng Pasay", Latitude = "14.5473", Longitude = "121.0023", CreatedOn = DateTime.Now, RoutesId = 11 },
							new Models.Locations { locationName = "Celeridad / Celeridad", Latitude = "14.5446", Longitude = "121.0027", CreatedOn = DateTime.Now, RoutesId = 11 },
							new Models.Locations { locationName = "Tramo, Lungsod ng Pasay", Latitude = "14.5421", Longitude = "121.0029", CreatedOn = DateTime.Now, RoutesId = 11 },
							new Models.Locations { locationName = "Tramo, Lungsod ng Pasay", Latitude = "14.5410", Longitude = "121.0030", CreatedOn = DateTime.Now, RoutesId = 11 },
							new Models.Locations { locationName = "Cabrera St, Lungsod ng Pasay", Latitude = "14.5398", Longitude = "121.0054", CreatedOn = DateTime.Now, RoutesId = 11 },
							new Models.Locations { locationName = "Cabrera/EDSA corner", Latitude = "14.5384", Longitude = "121.0049", CreatedOn = DateTime.Now, RoutesId = 11 },
							new Models.Locations { locationName = "Taft Ave. cor. EDSA (SB)", Latitude = "14.5378", Longitude = "121.0016", CreatedOn = DateTime.Now, RoutesId = 11 },
							new Models.Locations { locationName = "P. Zamora, Lungsod ng Pasay", Latitude = "14.5383", Longitude = "121.0008", CreatedOn = DateTime.Now, RoutesId = 11 },

							//Balintawak - PUC via Baesa
							//new Models.Locations { locationName = "", Latitude = "", Longitude = "", CreatedOn = DateTime.Now, RoutesId = 12},
							new Models.Locations { locationName = "Balintawak Terminal", Latitude = "14.6564", Longitude = "121.0003", CreatedOn = DateTime.Now, RoutesId = 12 },
							new Models.Locations { locationName = "Quirino Highway / S Gonzales Drive Intersection, Quezon City", Latitude = "14.6633", Longitude = "121.0022", CreatedOn = DateTime.Now, RoutesId = 12 },
							new Models.Locations { locationName = "Quirino Highway near Maximina Intersection, Quezon City", Latitude = "14.6646", Longitude = "121.0034", CreatedOn = DateTime.Now, RoutesId = 12 },
							new Models.Locations { locationName = "Quirino Highway / 127 Interior Intersection, Quezon City", Latitude = "14.6648", Longitude = "121.0040", CreatedOn = DateTime.Now, RoutesId = 12 },
							new Models.Locations { locationName = "Baesa Road, Quirino Highway, Quezon City", Latitude = "14.6653", Longitude = "121.0053", CreatedOn = DateTime.Now, RoutesId = 12 },

							new Models.Locations { locationName = "Baesa Road / Faith Intersection, Quirino Highway, Quezon City", Latitude = "14.6668", Longitude = "121.0074", CreatedOn = DateTime.Now, RoutesId = 12 },
							new Models.Locations { locationName = "Baesa Road, Quirino Highway, Quezon City", Latitude = "14.6681", Longitude = "121.0070", CreatedOn = DateTime.Now, RoutesId = 12 },
							new Models.Locations { locationName = "Baesa Road, Quirino Highway, Quezon City", Latitude = "14.6716", Longitude = "121.0056", CreatedOn = DateTime.Now, RoutesId = 12 },
							new Models.Locations { locationName = "Baesa Road, Quirino Highway, Quezon City", Latitude = "14.6721", Longitude = "121.0054", CreatedOn = DateTime.Now, RoutesId = 12 },
							new Models.Locations { locationName = "Baesa Road / Reparo Road Intersection, Quirino Highway, Quezon City", Latitude = "14.6756", Longitude = "121.0042", CreatedOn = DateTime.Now, RoutesId = 12 },

							new Models.Locations { locationName = "General Hospital, Baesa Road, Quirino Highway, Quezon City", Latitude = "14.6769", Longitude = "121.0051", CreatedOn = DateTime.Now, RoutesId = 12 },
							new Models.Locations { locationName = "Baesa Educational Foundation, Baesa Road, Quirino Highway, Quezon City", Latitude = "14.6779", Longitude = "121.0059", CreatedOn = DateTime.Now, RoutesId = 12 },
							new Models.Locations { locationName = "Baesa Road / Aquino Street Intersection, Quirino Highway, Quezon City", Latitude = "14.6783", Longitude = "121.0065", CreatedOn = DateTime.Now, RoutesId = 12 },
							new Models.Locations { locationName = "Baesa Road / Barnachea Compund Intersection, Quirino Highway, Quezon City", Latitude = "14.6791", Longitude = "121.0079", CreatedOn = DateTime.Now, RoutesId = 12 },
							new Models.Locations { locationName = "Immaculate Mother Learning Center, Baesa Road, Quirino Highway, Quezon City", Latitude = "14.6801", Longitude = "121.0089", CreatedOn = DateTime.Now, RoutesId = 12 },

							new Models.Locations { locationName = "Baesa Road / Roxas Intersection, Quirino Highway, Quezon City", Latitude = "14.6806", Longitude = "121.0094", CreatedOn = DateTime.Now, RoutesId = 12 },
							new Models.Locations { locationName = "St Francis of Assisi Parish Church, Roxas, Quirino Highway, Quezon City", Latitude = "14.6812", Longitude = "121.0098", CreatedOn = DateTime.Now, RoutesId = 12 },


							//SM North EDSA - Luzon Ave(Puregold)
							//new Models.Locations { locationName = "", Latitude = "", Longitude = "", CreatedOn = DateTime.Now, RoutesId = 13},

							new Models.Locations { locationName = "SM Hypermarket, North Avenue, Quezon City", Latitude = "14.6554", Longitude = "121.0311", CreatedOn = DateTime.Now, RoutesId = 13 },
							new Models.Locations { locationName = "Mindanao Avenue, Quezon City", Latitude = "14.6560", Longitude = "121.0355", CreatedOn = DateTime.Now, RoutesId = 13 },
							new Models.Locations { locationName = "Mindanao Avenue, Quezon City", Latitude = "14.6574", Longitude = "121.0359", CreatedOn = DateTime.Now, RoutesId = 13 },
							new Models.Locations { locationName = "Mindanao Avenue / VMMC, Quezon City", Latitude = "14.6592", Longitude = "121.0363", CreatedOn = DateTime.Now, RoutesId = 13 },
							new Models.Locations { locationName = "Cherry Foodarama, Congressional Avenue, Quezon City", Latitude = "14.6709", Longitude = "121.0390", CreatedOn = DateTime.Now, RoutesId = 13 },

							new Models.Locations { locationName = "Congressional Avenue Extension, Quezon City", Latitude = "14.6735", Longitude = "121.0508", CreatedOn = DateTime.Now, RoutesId = 13 },
							new Models.Locations { locationName = "Puregold Commonwealth/Luzon Avenue", Latitude = "14.6661", Longitude = "121.0702", CreatedOn = DateTime.Now, RoutesId = 13 },

							//SM North EDSA - Luzon Ave(Puregold)
							//new Models.Locations { locationName = "", Latitude = "", Longitude = "", CreatedOn = DateTime.Now, RoutesId = 14},

							new Models.Locations { locationName = "Hyundai, Quezon Avenue, Quezon City", Latitude = "14.6320", Longitude = "121.0181", CreatedOn = DateTime.Now, RoutesId = 14 },
							new Models.Locations { locationName = "Quezon Avenue / Roosevelt Avenue Intersection, Quezon City", Latitude = "14.6326", Longitude = "121.0190", CreatedOn = DateTime.Now, RoutesId = 14 },
							new Models.Locations { locationName = "Fisher Mall, Quezon Avenue, Quezon City", Latitude = "14.6334", Longitude = "121.0202", CreatedOn = DateTime.Now, RoutesId = 14 },
							new Models.Locations { locationName = "Quezon Avenue, Quezon City", Latitude = "14.6347", Longitude = "121.0225", CreatedOn = DateTime.Now, RoutesId = 14 },
							new Models.Locations { locationName = "Quezon Avenue, Quezon City", Latitude = "14.6354", Longitude = "121.0236", CreatedOn = DateTime.Now, RoutesId = 14 },

							new Models.Locations { locationName = "Quezon Avenue / West Avenue Intersection, Quezon City", Latitude = "14.6366", Longitude = "121.0273", CreatedOn = DateTime.Now, RoutesId = 14 },
							new Models.Locations { locationName = "Timog Ave. / Scout Santiago Intersection, Quezon City", Latitude = "14.6361", Longitude = "121.0294", CreatedOn = DateTime.Now, RoutesId = 14 },
							new Models.Locations { locationName = "Scout Tobias / Timog Ave. Intersection, Quezon City", Latitude = "14.6358", Longitude = "121.0310", CreatedOn = DateTime.Now, RoutesId = 14 },
							new Models.Locations { locationName = "Timog Ave. / Scout Tuason Intersection, Quezon City", Latitude = "14.6354", Longitude = "121.0331", CreatedOn = DateTime.Now, RoutesId = 14 },
							new Models.Locations { locationName = "Scout Limbaga, Quezon City", Latitude = "14.6338", Longitude = "121.0351", CreatedOn = DateTime.Now, RoutesId = 14 },

							new Models.Locations { locationName = "Tomas Morato Ave. / Scout De Guia Intersection, Quezon City", Latitude = "14.6313", Longitude = "121.0345", CreatedOn = DateTime.Now, RoutesId = 14 },
							new Models.Locations { locationName = "Tomas Morato Ave. / Marathon", Latitude = "14.6288", Longitude = "121.0339", CreatedOn = DateTime.Now, RoutesId = 14 },
							new Models.Locations { locationName = "Teodoro Gener / Kamuning Rd., Quezon City", Latitude = "14.6280", Longitude = "121.0363", CreatedOn = DateTime.Now, RoutesId = 14 },
							new Models.Locations { locationName = "Judge Damien Jimenez / Kamuning Rd., Quezon City", Latitude = "14.6287", Longitude = "121.0386", CreatedOn = DateTime.Now, RoutesId = 14 },
							new Models.Locations { locationName = "Kamuning Rd., Quezon City", Latitude = "14.6296", Longitude = "121.0418", CreatedOn = DateTime.Now, RoutesId = 14 },

							new Models.Locations { locationName = "Kamuning Rd. / Scout Rallos Extension Intersection, Quezon City", Latitude = "14.6305", Longitude = "121.0452", CreatedOn = DateTime.Now, RoutesId = 14 },
							new Models.Locations { locationName = "Kamias Rd. / Colonel Salgado Intersection, Quezon City", Latitude = "14.6310", Longitude = "121.0468", CreatedOn = DateTime.Now, RoutesId = 14 },
							new Models.Locations { locationName = "Kamias Rd. / Maliksi St Intersection, Quezon City", Latitude = "14.6319", Longitude = "121.0499", CreatedOn = DateTime.Now, RoutesId = 14 },
							new Models.Locations { locationName = "Kamias Rd / K-I Intersection, Quezon City, Manila", Latitude = "14.6326", Longitude = "121.0522", CreatedOn = DateTime.Now, RoutesId = 14 },
							new Models.Locations { locationName = "Kamias Rd. / Kalayaan Ave. Intersection, Quezon City", Latitude = "14.6333", Longitude = "121.0545", CreatedOn = DateTime.Now, RoutesId = 14 },

							new Models.Locations { locationName = "Kamias Rd. / Kasing-Kasing Intersection, Quezon City", Latitude = "14.6339", Longitude = "121.0566", CreatedOn = DateTime.Now, RoutesId = 14 },
							new Models.Locations { locationName = "Kamias Rd. / Anonas Extension Intersection, Quezon City", Latitude = "14.6342", Longitude = "121.0589", CreatedOn = DateTime.Now, RoutesId = 14 },
							new Models.Locations { locationName = "K-10th / Anonas Intersection, Quezon City, Manila", Latitude = "14.6334", Longitude = "121.0591", CreatedOn = DateTime.Now, RoutesId = 14 },
							new Models.Locations { locationName = "Don Quintin Paredes High School, Anonas, Quezon City", Latitude = "14.6314", Longitude = "121.0609", CreatedOn = DateTime.Now, RoutesId = 14 },
							new Models.Locations { locationName = "Anonas / Marang Intersection, Quezon City", Latitude = "14.6307", Longitude = "121.0611", CreatedOn = DateTime.Now, RoutesId = 14 },

							new Models.Locations { locationName = "Anonas / Molave Intersection, Quezon City", Latitude = "14.6286", Longitude = "121.0632", CreatedOn = DateTime.Now, RoutesId = 14 },
							new Models.Locations { locationName = "Molave / Lawan Intersection, Quezon City", Latitude = "14.6296", Longitude = "121.0677", CreatedOn = DateTime.Now, RoutesId = 14 },
							new Models.Locations { locationName = "Molave / Banuyo Intersection, Quezon City", Latitude = "14.6302", Longitude = "121.0689", CreatedOn = DateTime.Now, RoutesId = 14 },

							//SM North EDSA - Luzon Ave(Puregold)
							//new Models.Locations { locationName = "", Latitude = "", Longitude = "", CreatedOn = DateTime.Now, RoutesId = 15},

							new Models.Locations { locationName = "Senator Gil Puyat Ave. cor. Taft Ave., Lungsod ng Pasay", Latitude = "14.5541", Longitude = "120.9966", CreatedOn = DateTime.Now, RoutesId = 15 },
							new Models.Locations { locationName = "Senator Gil Puyat Ave., Lungsod ng Pasay", Latitude = "14.5531", Longitude = "120.9918", CreatedOn = DateTime.Now, RoutesId = 15 },
							new Models.Locations { locationName = "Senator Gil Puyat Ave., Lungsod ng Pasay", Latitude = "14.5513", Longitude = "120.9856", CreatedOn = DateTime.Now, RoutesId = 15 },
							new Models.Locations { locationName = "PNB", Latitude = "14.5487", Longitude = "120.9866", CreatedOn = DateTime.Now, RoutesId = 15 },
							new Models.Locations { locationName = "Macapagal Dampa", Latitude = "14.5451", Longitude = "120.9874", CreatedOn = DateTime.Now, RoutesId = 15 },
							new Models.Locations { locationName = "Multinational Avenue, Parañaque City", Latitude = "14.5431", Longitude = "120.9878", CreatedOn = DateTime.Now, RoutesId = 15 },
							new Models.Locations { locationName = "J. W. Diokno Boulevard Station 3", Latitude = "14.5384", Longitude = "120.9837", CreatedOn = DateTime.Now, RoutesId = 15 },


							// LRT-2 Stations 
							//new Models.Locations { locationName = "", Latitude = "", Longitude = "", CreatedOn = DateTime.Now, RoutesId = 16},
							new Models.Locations { locationName = "Antipolo Station", Latitude = "14.6249", Longitude = "121.1212", CreatedOn = DateTime.Now, RoutesId = 16 },
							new Models.Locations { locationName = "Marikina-Pasig Station", Latitude = "14.6205", Longitude = "121.1002", CreatedOn = DateTime.Now, RoutesId = 16 },
							new Models.Locations { locationName = "Santolan Station", Latitude = "14.6221", Longitude = "121.0867", CreatedOn = DateTime.Now, RoutesId = 16 },
							new Models.Locations { locationName = "Katipunan Station", Latitude = "14.6310", Longitude = "121.0726", CreatedOn = DateTime.Now, RoutesId = 16 },
							new Models.Locations { locationName = "Anonas Station", Latitude = "14.6281", Longitude = "121.0648", CreatedOn = DateTime.Now, RoutesId = 16 },
							new Models.Locations { locationName = "Araneta Center-Cubao Station", Latitude = "14.6228", Longitude = "121.0527", CreatedOn = DateTime.Now, RoutesId = 16 },
							new Models.Locations { locationName = "Betty Go-Belmonte Station ", Latitude = "14.6186", Longitude = "121.0427", CreatedOn = DateTime.Now, RoutesId = 16 },
							new Models.Locations { locationName = "Gilmore Station", Latitude = "14.6136", Longitude = "121.0342", CreatedOn = DateTime.Now, RoutesId = 16 },
							new Models.Locations { locationName = "J. Ruiz Station", Latitude = "14.6106", Longitude = "121.0261", CreatedOn = DateTime.Now, RoutesId = 16 },
							new Models.Locations { locationName = "V. Mapa Station", Latitude = "14.6042", Longitude = "121.0171", CreatedOn = DateTime.Now, RoutesId = 16 },
							new Models.Locations { locationName = "Pureza Station", Latitude = "14.6018", Longitude = "121.0051", CreatedOn = DateTime.Now, RoutesId = 16 },
							new Models.Locations { locationName = "Legarda Station", Latitude = "14.6012", Longitude = "120.9921", CreatedOn = DateTime.Now, RoutesId = 16 },
							new Models.Locations { locationName = "Recto Station", Latitude = "14.6036", Longitude = "120.9835", CreatedOn = DateTime.Now, RoutesId = 16 },


							// LRT-1 Stations 
							//new Models.Locations { locationName = "", Latitude = "", Longitude = "", CreatedOn = DateTime.Now, RoutesId = 17},

							new Models.Locations { locationName = "Baclaran Station", Latitude = "14.5342", Longitude = "120.9985", CreatedOn = DateTime.Now, RoutesId = 17 },
							new Models.Locations { locationName = "EDSA Station", Latitude = "14.5392", Longitude = "121.0007", CreatedOn = DateTime.Now, RoutesId = 17 },
							new Models.Locations { locationName = "Libertad Station", Latitude = "14.5478", Longitude = "120.9987", CreatedOn = DateTime.Now, RoutesId = 17 },
							new Models.Locations { locationName = "Gil Puyat Station", Latitude = "14.5543", Longitude = "120.9972", CreatedOn = DateTime.Now, RoutesId = 17 },
							new Models.Locations { locationName = "Vito Cruz Station", Latitude = "14.5634", Longitude = "120.9949", CreatedOn = DateTime.Now, RoutesId = 17 },

							new Models.Locations { locationName = "Quirino Station", Latitude = "14.5701", Longitude = "120.9917", CreatedOn = DateTime.Now, RoutesId = 17 },
							new Models.Locations { locationName = "Pedro Gil Station", Latitude = "14.5765", Longitude = "120.9881", CreatedOn = DateTime.Now, RoutesId = 17 },
							new Models.Locations { locationName = "UN Avenue Station", Latitude = "14.5824", Longitude = "120.9848", CreatedOn = DateTime.Now, RoutesId = 17 },
							new Models.Locations { locationName = "Central Terminal Station", Latitude = "14.5927", Longitude = "120.9818", CreatedOn = DateTime.Now, RoutesId = 17 },
							new Models.Locations { locationName = "Carriedo Station", Latitude = "14.5991", Longitude = "120.9813", CreatedOn = DateTime.Now, RoutesId = 17 },

							new Models.Locations { locationName = "Doroteo Jose Station", Latitude = "14.6054", Longitude = "120.9821", CreatedOn = DateTime.Now, RoutesId = 17 },
							new Models.Locations { locationName = "Bambang Station", Latitude = "14.6113", Longitude = "120.9825", CreatedOn = DateTime.Now, RoutesId = 17 },
							new Models.Locations { locationName = "Tayuman Station", Latitude = "14.6167", Longitude = "120.9828", CreatedOn = DateTime.Now, RoutesId = 17 },
							new Models.Locations { locationName = "Blumentritt Station", Latitude = "14.6226", Longitude = "120.9830", CreatedOn = DateTime.Now, RoutesId = 17 },
							new Models.Locations { locationName = "Abad Santos Station", Latitude = "14.6305", Longitude = "120.9816", CreatedOn = DateTime.Now, RoutesId = 17 },

							new Models.Locations { locationName = "R. Papa Station", Latitude = "14.6361", Longitude = "120.9824", CreatedOn = DateTime.Now, RoutesId = 17 },
							new Models.Locations { locationName = "5th Avenue Station", Latitude = "14.6443", Longitude = "120.9836", CreatedOn = DateTime.Now, RoutesId = 17 },
							new Models.Locations { locationName = "Monumento Station", Latitude = "14.6544", Longitude = "120.9840", CreatedOn = DateTime.Now, RoutesId = 17 },
							new Models.Locations { locationName = "Balintawak Station", Latitude = "14.6574", Longitude = "121.0041", CreatedOn = DateTime.Now, RoutesId = 17 },
							new Models.Locations { locationName = "Fernando Poe Jr. Station", Latitude = "14.6575", Longitude = "121.0211", CreatedOn = DateTime.Now, RoutesId = 17 }




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
