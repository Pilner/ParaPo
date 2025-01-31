import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const routes_seed = [
	{
		route_name: 'SSS Village, Marikina - Cubao, Quezon City - Stop & Shop, Manila',
		category: 'Jeep',
		min_fare: 15,
		locations: [
			{
				location_name: 'Panorama Jeepney Terminal, SSS Village',
				latitude: 14.63892,
				longitude: 121.12585,
			},
			{
				location_name: 'Horizon St, Marikina City',
				latitude: 14.64025,
				longitude: 121.12259,
			},
			{
				location_name: 'Lilac St, Marikina City',
				latitude: 14.63959,
				longitude: 121.1218,
			},
			{
				location_name: 'Lilac St, Marikina City',
				latitude: 14.637336,
				longitude: 121.121611,
			},
			{
				location_name: 'Olive St, Marikina City',
				latitude: 14.637213,
				longitude: 121.119111,
			},
			{
				location_name: 'Olive St, Marikina City',
				latitude: 14.637471,
				longitude: 121.117379,
			},
			{
				location_name: 'Russet St / Aquamarine St Intersection, Marikina City',
				latitude: 14.638774,
				longitude: 121.116335,
			},
			{
				location_name: 'Russet St / Sapphire Street Intersection, Marikina City',
				latitude: 14.64016,
				longitude: 121.116834,
			},
			{
				location_name: 'Bronze St / Rainbow St Intersection, Marikina City',
				latitude: 14.640695,
				longitude: 121.115954,
			},
			{
				location_name: 'Azure St / Rainbow St Intersection, Marikina City',
				latitude: 14.64098,
				longitude: 121.114259,
			},
			{
				location_name: 'Rainbow St Near J. M. Panganiban St Intersection, Marikina City',
				latitude: 14.64181,
				longitude: 121.111697,
			},
			{
				location_name: 'Katipunan St, Marikina City',
				latitude: 14.642174,
				longitude: 121.110631,
			},
			{
				location_name: 'J. Molina St / Katipunan St Intersection',
				latitude: 14.645236,
				longitude: 121.11212,
			},
			{
				location_name: 'General Ordoñez Ave, Marikina City',
				latitude: 14.646343,
				longitude: 121.11272,
			},
			{
				location_name: 'General Ordoñez Ave / T. Bugallon St Intersection, Marikina City',
				latitude: 14.64842,
				longitude: 121.112303,
			},
			{
				location_name: 'Bayan-Bayanan Ave., Marikina City',
				latitude: 14.650777,
				longitude: 121.111905,
			},
			{
				location_name: 'Bayan-Bayanan Ave., Marikina City',
				latitude: 14.650995,
				longitude: 121.110496,
			},

			{
				location_name: 'Bayan-Bayanan Ave., Marikina City',
				latitude: 14.65068,
				longitude: 121.106951,
			},
			{
				location_name: 'Bayan-Bayanan Ave., Marikina City',
				latitude: 14.65096,
				longitude: 121.104149,
			},
			{
				location_name: 'E Rodriguez Ave. / Bayan-Bayanan Avenue Intersection, Marikina City',
				latitude: 14.65096,
				longitude: 121.104149,
			},
			{
				location_name: 'E Rodriguez Ave., Marikina City',
				latitude: 14.649075,
				longitude: 121.102972,
			},
			{
				location_name: 'E Rodriguez Ave., Marikina City',
				latitude: 14.6447,
				longitude: 121.100843,
			},
			{
				location_name: 'Aquilina St / E Rodriguez Ave. Intersection, Marikina City',
				latitude: 14.642541,
				longitude: 121.099799,
			},
			{
				location_name: 'E Rodriguez Ave. / E Mendoza St Intersection, Marikina City',
				latitude: 14.640295,
				longitude: 121.098762,
			},
			{
				location_name: 'Sumulong Hwy., Marikina City',
				latitude: 14.635656,
				longitude: 121.097341,
			},
			{
				location_name: 'A. Bonifacio Ave., Marikina City',
				latitude: 14.636193,
				longitude: 121.091032,
			},
			{
				location_name: 'A. Bonifacio Ave., Marikina City',
				latitude: 14.635225,
				longitude: 121.088349,
			},
			{
				location_name: 'Tañong, A. Bonifacio Ave., Marikina City',
				latitude: 14.633818,
				longitude: 121.085519,
			},
			{
				location_name: 'Riverbanks, A. Bonifacio Ave., Marikina City',
				latitude: 14.63329,
				longitude: 121.084068,
			},
			{
				location_name: 'Barangka - Marcos Hwy Intersection, A. Bonifacio Ave., Marikina City',
				latitude: 14.632222,
				longitude: 121.079461,
			},
			{
				location_name: 'Marcos Hwy / A. Bonifacio Ave., Marikina City',
				latitude: 14.632145,
				longitude: 121.077886,
			},
			{
				location_name: 'Aurora Blvd. / Katipunan Ave., Quezon City',
				latitude: 14.631917,
				longitude: 121.074364,
			},
			{
				location_name: 'LRT-2 Katipunan/St. Bridget School, Aurora Blvd., Quezon City',
				latitude: 14.63098,
				longitude: 121.072422,
			},
			{
				location_name: 'Asian College of Science and Technology, Aurora Blvd., Quezon City',
				latitude: 14.629305,
				longitude: 121.068901,
			},
			{
				location_name: 'LRT-2 Anonas, Aurora Blvd., Quezon City',
				latitude: 14.628104,
				longitude: 121.065194,
			},
			{
				location_name: 'T.I.P Cubao, Aurora Blvd / 20th Avenue, Quezon City, Manila',
				latitude: 14.626521,
				longitude: 121.06054,
			},
			{
				location_name: 'General Romulo Ave. / Aurora Blvd. Intersection, Quezon City',
				latitude: 14.623995,
				longitude: 121.055542,
			},
			{
				location_name: 'Aurora Blvd / General Aguinaldo Ave Intersection / LRT 2 - Cubao Station, Quezon City',
				latitude: 14.622924,
				longitude: 121.053188,
			},
			{
				location_name: 'Aurora Blvd / EDSA Avenue Intersection, Quezon City',
				latitude: 14.62172,
				longitude: 121.050275,
			},
			{
				location_name: 'Aurora Blvd / N Domingo Intersection, Quezon City',
				latitude: 14.620046,
				longitude: 121.046044,
			},
			{
				location_name: 'Aurora Blvd / Betty Go-Belmonte Intersection / LRT 2 - Betty Go Station, Quezon City',
				latitude: 14.618222,
				longitude: 121.042051,
			},
			{
				location_name: 'Saint Paul University Of Quezon City, Aurora Boulevard Cor. Gilmore Avenue, Quezon City',
				latitude: 14.616891,
				longitude: 121.039998,
			},
			{
				location_name: 'Doña M. Hemady Ave / Ramon Magsaysay Blvd Intersection, Quezon City',
				latitude: 14.615135,
				longitude: 121.037087,
			},
			{
				location_name: 'Lrt-2 Gilmore Station, Aurora Blvd, Quezon City',
				latitude: 14.613345,
				longitude: 121.033684,
			},
			{
				location_name: 'Aurora Blvd , Quezon City',
				latitude: 14.612159,
				longitude: 121.030676,
			},
			{
				location_name: 'Aurora Blvd / LRT 2 - J. Ruiz Station, San Juan',
				latitude: 14.610846,
				longitude: 121.026796,
			},
			{
				location_name: 'S.Veloso / Aurora Blvd Intersection, San Juan',
				latitude: 14.609839,
				longitude: 121.023691,
			},
			{
				location_name: 'Aurora Blvd , San Juan',
				latitude: 14.608625,
				longitude: 121.021665,
			},
			{
				location_name: 'University of the East Ramon Magsaysay, Aurora Blvd , San Juan',
				latitude: 14.607574,
				longitude: 121.020512,
			},
			{
				location_name: 'Santa Mesa Blvd/ LRT 2 - V.Mapa Station, Manila',
				latitude: 14.604273,
				longitude: 121.017107,
			},
			{
				location_name: 'Magsaysay Blvd / V. Mapa Street Intersection, Manila',
				latitude: 14.603012,
				longitude: 121.01581,
			},
			{
				location_name: 'V. Mapa Street  / Old Sta. Mesa St Intersection, Manila',
				latitude: 14.6002,
				longitude: 121.016771,
			},
			{
				location_name: 'Old Sta. Mesa St , Manila',
				latitude: 14.59963,
				longitude: 121.015071,
			},
			{
				location_name: 'Teresa, Old Sta. Mesa St , Manila',
				latitude: 14.60096,
				longitude: 121.01309,
			},
			{
				location_name: 'Old Sta. Mesa St , Manila - Magsaysay Blvd',
				latitude: 14.60201,
				longitude: 121.01198,
			},
			{
				location_name: 'Magsaysay Blvd / V. Mapa Street Intersection, Manila',
				latitude: 14.603012,
				longitude: 121.01581,
			},
		],
	},
	{
		route_name: 'Montalban - Cubao via Aurora Blvd',
		category: 'Jeep',
		min_fare: 15,
		locations: [
			{
				location_name: 'Luvers, San Rafael, Montalban',
				latitude: 14.73537,
				longitude: 121.15431,
			},
			{
				location_name: 'Total, San Rafael, Montalban',
				latitude: 14.73532,
				longitude: 121.15219,
			},
			{
				location_name: 'Balite, San Rafael, Montalban',
				latitude: 14.7355,
				longitude: 121.1464,
			},
			{
				location_name: 'Bayan, Montalban',
				latitude: 14.73241,
				longitude: 121.14523,
			},
			{
				location_name: 'Bayan, Montalban',
				latitude: 14.73241,
				longitude: 121.14523,
			},
			{
				location_name: 'J.P Rizal Avenue',
				latitude: 14.72772,
				longitude: 121.14369,
			},
			{
				location_name: 'Manggahan, Montalban',
				latitude: 14.7245,
				longitude: 121.1423,
			},
			{
				location_name: 'Burgos, Montalban',
				latitude: 14.71993,
				longitude: 121.13916,
			},
			{
				location_name: 'A. Mabini Street',
				latitude: 14.7143,
				longitude: 121.1357,
			},
			{
				location_name: 'Maly, San Mateo',
				latitude: 14.7103,
				longitude: 121.1332,
			},
			{
				location_name: 'Guinayang, San Mateo',
				latitude: 14.7074,
				longitude: 121.1306,
			},
			{
				location_name: 'General A.Luna Street',
				latitude: 14.7056,
				longitude: 121.1277,
			},
			{
				location_name: 'Dulong Bayan, San Mateo',
				latitude: 14.7011,
				longitude: 121.1254,
			},
			{
				location_name: 'Guitnang Bayan, San Mateo',
				latitude: 14.6983,
				longitude: 121.1224,
			},
			{
				location_name: 'Santa Ana, San Mateo',
				latitude: 14.692,
				longitude: 121.117,
			},
			{
				location_name: 'Ampid II, San Mateo',
				latitude: 14.6878,
				longitude: 121.1165,
			},
			{
				location_name: 'Ampid Bridge, San Mateo',
				latitude: 14.68511,
				longitude: 121.11611,
			},
			{
				location_name: 'SM City San Mateo, San Mateo',
				latitude: 14.68027,
				longitude: 121.11377,
			},
			{
				location_name: 'Banaba, Marikina',
				latitude: 14.67591,
				longitude: 121.11026,
			},
			{
				location_name: 'Banaba - Nangka Bridge, Marikina',
				latitude: 14.674,
				longitude: 121.10957,
			},
			{
				location_name: 'Nangka, Marikina',
				latitude: 14.67031,
				longitude: 121.10854,
			},
			{
				location_name: 'Marikina Greenheights, Marikina',
				latitude: 14.66697,
				longitude: 121.10749,
			},
			{
				location_name: 'Tumana, Marikina',
				latitude: 14.66078,
				longitude: 121.10527,
			},
			{
				location_name: 'Concepcion, Marikina',
				latitude: 14.6507,
				longitude: 121.1029,
			},
			{
				location_name: 'J.P Rizal Street',
				latitude: 14.6494,
				longitude: 121.0999,
			},
			{
				location_name: 'Emerald Village, Marikina',
				latitude: 14.6437,
				longitude: 121.0955,
			},
			{
				location_name: 'J.P Rizal Street',
				latitude: 14.6394,
				longitude: 121.0942,
			},
			{
				location_name: 'J.P. Rizal Street - Jesus Dela Peña',
				latitude: 14.63595,
				longitude: 121.09442,
			},
			{
				location_name: 'Jesus Dela Peña - A. Bonifacio Avenue',
				latitude: 14.63613,
				longitude: 121.09168,
			},
			{
				location_name: 'Tañong, Marikina',
				latitude: 14.6341,
				longitude: 121.0861,
			},
			{
				location_name: 'Barangka, Marikina',
				latitude: 14.6327,
				longitude: 121.0822,
			},
			{
				location_name: 'A. Bonifacio Avenue',
				latitude: 14.63233,
				longitude: 121.08059,
			},
			{
				location_name: 'A. Bonifacio Avenue - Marcos Hwy',
				latitude: 14.63215,
				longitude: 121.07795,
			},
			{
				location_name: 'Marcos Hwy',
				latitude: 14.6324,
				longitude: 121.07529,
			},
			{
				location_name: 'LRT 2 Katipunan Station',
				latitude: 14.63138,
				longitude: 121.07326,
			},
			{
				location_name: 'Aurora Blvd. - Asian College of Science and Technology',
				latitude: 14.62932,
				longitude: 121.06899,
			},
			{
				location_name: 'LRT 2 Anonas Station',
				latitude: 14.628,
				longitude: 121.06412,
			},
			{
				location_name: 'Aurora Blvd. - Technological Institute of the Philippines (TIP)',
				latitude: 14.6268,
				longitude: 121.06118,
			},
			{
				location_name: 'Aurora Blvd. - 15th Ave. Intersection',
				latitude: 14.62497,
				longitude: 121.0572,
			},
			{
				location_name: 'Aurora Blvd. - Gen. Romulo Ave. Intersection',
				latitude: 14.62416,
				longitude: 121.05544,
			},
			{
				location_name: 'Gen. Romulo Ave.',
				latitude: 14.62117,
				longitude: 121.05657,
			},
			{
				location_name: 'Gen. Romulo Ave. - Gen. MacArthur Ave',
				latitude: 14.62073,
				longitude: 121.05639,
			},
			{
				location_name: 'Gen. MacArthur Ave - Times Square Avenue - Araneta Cubao Bus Station',
				latitude: 14.62152,
				longitude: 121.05513,
			},
			{
				location_name: 'Times Square Avenue',
				latitude: 14.62237,
				longitude: 121.05464,
			},
			{
				location_name: 'Times Square Avenue - Aurora Blvd',
				latitude: 14.62316,
				longitude: 121.05398,
			},
			{
				location_name: 'Aurora Blvd. - Gen. Romulo Ave. Intersection',
				latitude: 14.62416,
				longitude: 121.05544,
			},
		],
	},
	{
		route_name: 'Montalban Heights(Rizal) - Litex',
		category: 'Jeep',
		min_fare: 15,
		locations: [
			{
				location_name: 'Montalban Heights',
				latitude: 14.7478,
				longitude: 121.1235,
			},
			{
				location_name: 'Mayon Avenue, Rodriguez / Crossing',
				latitude: 14.7348,
				longitude: 121.1268,
			},
			{
				location_name: 'Payatas Road, Quezon City',
				latitude: 14.718,
				longitude: 121.1009,
			},
			{
				location_name: 'Payatas Road, Quezon City',
				latitude: 14.7163,
				longitude: 121.0997,
			},
			{
				location_name: 'Payatas Road, Quezon City',
				latitude: 14.7148,
				longitude: 121.0971,
			},
			{
				location_name: 'Payatas Road near Molave Street, Quezon City',
				latitude: 14.7139,
				longitude: 121.0948,
			},
			{
				location_name: 'Payatas Road, Quezon City',
				latitude: 14.7144,
				longitude: 121.0923,
			},
			{
				location_name: 'Payatas Road, Quezon City',
				latitude: 14.7143,
				longitude: 121.0905,
			},
			{
				location_name: 'Payatas Road, Quezon City',
				latitude: 14.7113,
				longitude: 121.0907,
			},
			{
				location_name: 'Manila Gravel Pit Road / Makisig Intersection, Quezon City',
				latitude: 14.7093,
				longitude: 121.0908,
			},
			{
				location_name: 'Manila Gravel Pit Road, Quezon City',
				latitude: 14.706,
				longitude: 121.0881,
			},
			{
				location_name: 'Payatas Road, Quezon City',
				latitude: 14.7031,
				longitude: 121.089,
			},
			{
				location_name: 'Litex Market, Commonwealth Avenue, Quezon City',
				latitude: 14.7013,
				longitude: 121.0868,
			},
		],
	},
	{
		route_name: 'Marikina - San Mateo (Banaba)',
		category: 'Jeep',
		min_fare: 13,
		locations: [
			{
				location_name: 'Freedom Park, Marikina City',
				latitude: 14.6328,
				longitude: 121.0977,
			},
			{
				location_name: 'Shoe Ave., Marikina City',
				latitude: 14.6404,
				longitude: 121.0979,
			},
			{
				location_name: 'Daang Bakal / C. A. Santos St Intersection, Marikina City',
				latitude: 14.641,
				longitude: 121.0942,
			},
			{
				location_name: 'J. P. Rizal St, Marikina City',
				latitude: 14.6425,
				longitude: 121.0947,
			},
			{
				location_name: 'St. Victoria Hospital, Marikina City',
				latitude: 14.6423,
				longitude: 121.0945,
			},
			{
				location_name: 'J. P. Rizal St, Marikina City',
				latitude: 14.6475,
				longitude: 121.0969,
			},
			{
				location_name: 'Roosevelt College, J. P. Rizal St., Marikina City',
				latitude: 14.6492,
				longitude: 121.0984,
			},
			{
				location_name: 'J. P. Rizal St., Marikina City',
				latitude: 14.6494,
				longitude: 121.1015,
			},
			{
				location_name: 'J. P. Rizal cor. Bayan-Bayanan Ave., Marikina City',
				latitude: 14.6507,
				longitude: 121.1029,
			},
			{
				location_name: 'J. P. Rizal St. cor. Bagong Farmers Ave., Tumana, Marikina City',
				latitude: 14.6528,
				longitude: 121.1032,
			},
			{
				location_name: 'J. P. Rizal St, Marikina City',
				latitude: 14.6613,
				longitude: 121.1054,
			},
			{
				location_name: 'J.P. Rizal cor. Fairlane, Marikina City',
				latitude: 14.6633,
				longitude: 121.1063,
			},
			{
				location_name: 'J. P. Rizal St / Egypt Street Intersection, Marikina City',
				latitude: 14.665,
				longitude: 121.1069,
			},
			{
				location_name: 'J. P. Rizal St / Japan Avenue Intersection, Marikina City',
				latitude: 14.667,
				longitude: 121.1075,
			},
			{
				location_name: 'J. P. Rizal St / Buen-Mar Ave Intersection, Marikina City, Manila',
				latitude: 14.6699,
				longitude: 121.1084,
			},
			{
				location_name: 'Nangka, J.P. Rizal, Marikina City',
				latitude: 14.6728,
				longitude: 121.1092,
			},
			{
				location_name: 'J. P. Rizal St, Banaba, San Mateo, Rizal',
				latitude: 14.6753,
				longitude: 121.1099,
			},
		],
	},
	{
		route_name: 'EDSA/Shaw Blvd-E.R Ort',
		category: 'Jeep',
		min_fare: 13,
		locations: [
			{
				location_name: 'Mayflower, Mandaluyong City',
				latitude: 14.5778,
				longitude: 121.0536,
			},
			{
				location_name: 'Tropical Hut/10Q, Shaw Blvd.',
				latitude: 14.5765,
				longitude: 121.059,
			},
			{
				location_name: 'Shaw Blvd., Pasig City',
				latitude: 14.5752,
				longitude: 121.0605,
			},
			{
				location_name: 'Shaw/San Roque, Pasig City',
				latitude: 14.5721,
				longitude: 121.0643,
			},
			{
				location_name: 'Shaw Blvd., Pasig City',
				latitude: 14.5706,
				longitude: 121.0661,
			},
			{
				location_name: 'Capitol 8/San Ignacio St., Pasig Blvd., Pasig City',
				latitude: 14.5675,
				longitude: 121.066,
			},
			{
				location_name: 'BDO Pasig Blvd.',
				latitude: 14.5655,
				longitude: 121.0657,
			},
			{
				location_name: 'Pineda/Rizal Medical Center, Pasig Blvd., Pasig City',
				latitude: 14.5636,
				longitude: 121.0654,
			},
			{
				location_name: 'Pasig Blvd / C-5 Intersection , Pasig City, Manila',
				latitude: 14.5629,
				longitude: 121.0681,
			},
			{
				location_name: 'C-5',
				latitude: 14.5643,
				longitude: 121.0699,
			},
			{
				location_name: 'Mary Immaculate Hospital, Pasig City',
				latitude: 14.5692,
				longitude: 121.0711,
			},
			{
				location_name: 'Eulogio Rodriguez Jr. Ave. / Danny Flo St, Pasig City',
				latitude: 14.5704,
				longitude: 121.0713,
			},
			{
				location_name: 'Eulogio Rodriguez Jr. Ave., Pasig City',
				latitude: 14.5726,
				longitude: 121.0719,
			},
			{
				location_name: 'Eulogio Rodriguez Jr. Ave., Pasig City',
				latitude: 14.5759,
				longitude: 121.0728,
			},
			{
				location_name: 'Eulogio Rodriguez Jr. Ave. / Lanuza Ave., Pasig City',
				latitude: 14.5784,
				longitude: 121.0741,
			},
			{
				location_name: 'Eulogio Rodriguez Jr Ave., Pasig City',
				latitude: 14.5818,
				longitude: 121.0763,
			},
			{
				location_name: 'Eulogio Rodriguez Jr Ave. / Doña Julia Vargas Ave. Intersection, Pasig City',
				latitude: 14.5825,
				longitude: 121.0769,
			},
			{
				location_name: 'JP Raceway, Pasig City',
				latitude: 14.5885,
				longitude: 121.08,
			},
			{
				location_name: 'Frontera, Ortigas Ave. cor. C-5, Pasig City',
				latitude: 14.5898,
				longitude: 121.0784,
			},
		],
	},
	{
		route_name: 'Gate 5 - Greenhills Shopping Center Loop',
		category: 'Jeep',
		min_fare: 13,
		locations: [
			{
				location_name: 'Greenhills Shopping Center Terminal',
				latitude: 14.6006,
				longitude: 121.0487,
			},
			{
				location_name: 'Annapolis, San Juan',
				latitude: 14.6047,
				longitude: 121.0536,
			},
			{
				location_name: 'Gate 5-Greenhills Terminal, Annapolis',
				latitude: 14.6059,
				longitude: 121.0562,
			},
		],
	},
	{
		route_name: 'Sta. Lucia - Binangonan',
		category: 'Jeep',
		min_fare: 13,
		locations: [
			{
				location_name: 'Felix Ave., Cainta',
				latitude: 14.5923,
				longitude: 121.1125,
			},
			{
				location_name: 'Felix Ave., Cainta',
				latitude: 14.5895,
				longitude: 121.1143,
			},
			{
				location_name: 'Felix Ave., Cainta',
				latitude: 14.5874,
				longitude: 121.1148,
			},
			{
				location_name: 'Ortigas Avenue Extension, Cainta',
				latitude: 14.586,
				longitude: 121.1162,
			},
			{
				location_name: 'Sunset Drive Footbridge, Ortigas Avenue Extension, Cainta',
				latitude: 14.5837,
				longitude: 121.1237,
			},
			{
				location_name: 'Ortigas Avenue Extension, Cainta',
				latitude: 14.5829,
				longitude: 121.1265,
			},
			{
				location_name: 'Ortigas Avenue Extension, Taytay, Rizal',
				latitude: 14.581,
				longitude: 121.1321,
			},
			{
				location_name: 'Coco Demer St / Ortigas Avenue Extension, Tatay, Manila',
				latitude: 14.5792,
				longitude: 121.1381,
			},
		],
	},
	{
		route_name: 'Edsa/Shaw Central-Pateros',
		category: 'Jeep',
		min_fare: 13,
		locations: [
			{
				location_name: 'EDSA Central Jeepney Terminal, Mandaluyong City',
				latitude: 14.5803,
				longitude: 121.0545,
			},
			{
				location_name: 'Shaw Blvd., Mandaluyong City',
				latitude: 14.5796,
				longitude: 121.0554,
			},
			{
				location_name: 'Tropical Hut/10Q, Shaw Blvd.',
				latitude: 14.5764,
				longitude: 121.0591,
			},
			{
				location_name: 'Hong Kong Noodles & Dimsum, Shaw Blvd., Pasig City',
				latitude: 14.5756,
				longitude: 121.0602,
			},
			{
				location_name: 'Shaw Blvd., Pasig City',
				latitude: 14.5746,
				longitude: 121.0613,
			},
			{
				location_name: 'Kapitolyo, Pasig City',
				latitude: 14.5741,
				longitude: 121.0619,
			},
			{
				location_name: 'Shaw/San Roque, Pasig City',
				latitude: 14.572,
				longitude: 121.0644,
			},
			{
				location_name: 'Shaw Blvd., Pasig City',
				latitude: 14.5707,
				longitude: 121.0659,
			},
			{
				location_name: 'Capitol 8/San Ignacio St., Pasig Blvd., Pasig City',
				latitude: 14.5675,
				longitude: 121.066,
			},
			{
				location_name: 'BDO Pasig Blvd.',
				latitude: 14.5658,
				longitude: 121.0657,
			},
			{
				location_name: 'Pineda/Rizal Medical Center, Pasig Blvd., Pasig City',
				latitude: 14.5639,
				longitude: 121.0654,
			},
			{
				location_name: 'Pasig Blvd / C-5 Intersection , Pasig City, Manila',
				latitude: 14.5629,
				longitude: 121.068,
			},
			{ location_name: 'C-5', latitude: 14.5646, longitude: 121.07 },
			{
				location_name: 'Pasig Boulevard Extension, Pasig City',
				latitude: 14.5661,
				longitude: 121.0707,
			},
			{
				location_name: 'Pasig Blvd. Ext.',
				latitude: 14.566,
				longitude: 121.076,
			},
			{
				location_name: 'Metrobank',
				latitude: 14.5651,
				longitude: 121.0759,
			},
			{
				location_name: 'A. Mabini St / Blumentritt St, Pasig City',
				latitude: 14.5633,
				longitude: 121.076,
			},
			{
				location_name: 'A. Mabini St, Pasig City',
				latitude: 14.5624,
				longitude: 121.0761,
			},
			{
				location_name: 'Plaza Rizal, Pasig City',
				latitude: 14.5605,
				longitude: 121.0766,
			},
			{
				location_name: 'Plaza Rizal, Pasig City',
				latitude: 14.5604,
				longitude: 121.0761,
			},
			{
				location_name: 'P. Burgos, Pasig City',
				latitude: 14.5596,
				longitude: 121.0738,
			},
			{
				location_name: 'Dr. Garcia, Pasig City',
				latitude: 14.5575,
				longitude: 121.0749,
			},
			{
				location_name: 'A. Luna St / Dr Garcia Intersection , Pasig City, Manila',
				latitude: 14.5569,
				longitude: 121.0758,
			},
			{
				location_name: 'A. Luna St, Pasig City',
				latitude: 14.5555,
				longitude: 121.076,
			},
			{
				location_name: 'A. Luna St, Pasig City',
				latitude: 14.5519,
				longitude: 121.0748,
			},
			{
				location_name: 'M. Almeda, Pateros',
				latitude: 14.551,
				longitude: 121.0739,
			},
			{
				location_name: 'Caltex Pateros, R. Jabson Street, Pateros',
				latitude: 14.5503,
				longitude: 121.0733,
			},
			{
				location_name: 'M. Almeda, Pateros',
				latitude: 14.55,
				longitude: 121.073,
			},
			{
				location_name: 'M. Almeda, Pateros',
				latitude: 14.5479,
				longitude: 121.0719,
			},
			{
				location_name: 'M. Almeda, Pateros',
				latitude: 14.547,
				longitude: 121.0704,
			},
			{
				location_name: 'M. Almeda, Pateros',
				latitude: 14.5445,
				longitude: 121.068,
			},
			{
				location_name: 'M. Almeda / G. de Borja Intersection, Pateros',
				latitude: 14.543,
				longitude: 121.0672,
			},
			{
				location_name: 'Villa Monica Resort, M. Almeda, Pateros',
				latitude: 14.5408,
				longitude: 121.0672,
			},
		],
	},
	{
		route_name: 'Blumentritt-Retiro',
		category: 'Jeep',
		min_fare: 13,
		locations: [
			{
				location_name: 'N. S. Amoranto Sr. Avenue / Don Jose Intersection, Quezon City',
				latitude: 14.6357,
				longitude: 121.0084,
			},
			{
				location_name: 'N. S. Amoranto Sr. Avenue / Don Jose Intersection, Quezon City',
				latitude: 14.6354,
				longitude: 121.0077,
			},
			{
				location_name: 'N. S. Amoranto Sr. Avenue / Sto. Domingo Avenue Intersection, Quezon City',
				latitude: 14.6348,
				longitude: 121.0063,
			},
			{
				location_name: 'N. S. Amoranto Sr. Avenue / Biak an Bato Intersection, Quezon City',
				latitude: 14.6339,
				longitude: 121.0044,
			},
			{
				location_name: 'N. S. Amoranto Sr. Avenue / Banawe Avenue Intersection, Quezon City',
				latitude: 14.6329,
				longitude: 121.002,
			},
			{
				location_name: 'N. S. Amoranto Sr. Avenue, Quezon City',
				latitude: 14.6317,
				longitude: 120.9995,
			},
			{
				location_name: 'N. S. Amoranto Sr. Avenue, Quezon City',
				latitude: 14.6305,
				longitude: 120.9969,
			},
			{
				location_name: 'Norberto S. Amoranto Street / Bulasan Intersection, Quezon City',
				latitude: 14.6295,
				longitude: 120.9952,
			},
			{
				location_name: 'Norberto S. Amoranto Street / Iba Intersection, Quezon City',
				latitude: 14.6273,
				longitude: 120.9928,
			},
			{
				location_name: 'Norberto S. Amoranto Street / Calavite Intersection, Quezon City',
				latitude: 14.6258,
				longitude: 120.9911,
			},
			{
				location_name: 'Ferdinand Blumentritt / Felix Huertas Intersection, Quezon City',
				latitude: 14.6237,
				longitude: 120.9848,
			},
			{
				location_name: 'Blumentritt / Rizal Ave. Intersection, City of Manila',
				latitude: 14.6231,
				longitude: 120.9833,
			},
		],
	},
	{
		route_name: 'Blumentritt-Balut',
		category: 'Jeep',
		min_fare: 13,
		locations: [
			{
				location_name: 'North Bay Boulevard / Rodriguez Intersection, Tondo',
				latitude: 14.6298,
				longitude: 120.9647,
			},
			{
				location_name: 'H. Lopez Blvd. / Guidote Intersection, Tondo',
				latitude: 14.6273,
				longitude: 120.9658,
			},
			{
				location_name: 'Immaculate Conception Academy, North Bay Blvd., City of Manila',
				latitude: 14.6242,
				longitude: 120.9678,
			},
			{
				location_name: 'Manila Faith Assembly of God, Juan Luna, City of Manila',
				latitude: 14.6222,
				longitude: 120.9719,
			},
			{
				location_name: 'Gagalangin Fire Station, Juan Luna, City of Manila',
				latitude: 14.6254,
				longitude: 120.973,
			},
			{
				location_name: 'F. Benitez Elementary School, Juan Luna, Caloocan City',
				latitude: 14.6267,
				longitude: 120.9734,
			},
			{
				location_name: 'Antipolo St., City of Manila',
				latitude: 14.6235,
				longitude: 120.9773,
			},
		],
	},
	{
		route_name: 'Cabrera - Libertad',
		category: 'Jeep',
		min_fare: 13,
		locations: [
			{
				location_name: 'Antonio Arnaiz Ave / P.Zamora Intersection, Manila',
				latitude: 14.5481,
				longitude: 121.0009,
			},
			{
				location_name: 'Tramo, Lungsod ng Pasay',
				latitude: 14.5473,
				longitude: 121.0023,
			},
			{
				location_name: 'Celeridad / Celeridad',
				latitude: 14.5446,
				longitude: 121.0027,
			},
			{
				location_name: 'Tramo, Lungsod ng Pasay',
				latitude: 14.5421,
				longitude: 121.0029,
			},
			{
				location_name: 'Tramo, Lungsod ng Pasay',
				latitude: 14.541,
				longitude: 121.003,
			},
			{
				location_name: 'Cabrera St, Lungsod ng Pasay',
				latitude: 14.5398,
				longitude: 121.0054,
			},
			{
				location_name: 'Cabrera/EDSA corner',
				latitude: 14.5384,
				longitude: 121.0049,
			},
			{
				location_name: 'Taft Ave. cor. EDSA (SB)',
				latitude: 14.5378,
				longitude: 121.0016,
			},
			{
				location_name: 'P. Zamora, Lungsod ng Pasay',
				latitude: 14.5383,
				longitude: 121.0008,
			},
		],
	},
	{
		route_name: 'Balintawak - PUC via Baesa',
		category: 'Jeep',
		min_fare: 13,
		locations: [
			{
				location_name: 'Balintawak Terminal',
				latitude: 14.6564,
				longitude: 121.0003,
			},
			{
				location_name: 'Quirino Highway / S Gonzales Drive Intersection, Quezon City',
				latitude: 14.6633,
				longitude: 121.0022,
			},
			{
				location_name: 'Quirino Highway near Maximina Intersection, Quezon City',
				latitude: 14.6646,
				longitude: 121.0034,
			},
			{
				location_name: 'Quirino Highway / 127 Interior Intersection, Quezon City',
				latitude: 14.6648,
				longitude: 121.004,
			},
			{
				location_name: 'Baesa Road, Quirino Highway, Quezon City',
				latitude: 14.6653,
				longitude: 121.0053,
			},
			{
				location_name: 'Baesa Road / Faith Intersection, Quirino Highway, Quezon City',
				latitude: 14.6668,
				longitude: 121.0074,
			},
			{
				location_name: 'Baesa Road, Quirino Highway, Quezon City',
				latitude: 14.6681,
				longitude: 121.007,
			},
			{
				location_name: 'Baesa Road, Quirino Highway, Quezon City',
				latitude: 14.6716,
				longitude: 121.0056,
			},
			{
				location_name: 'Baesa Road, Quirino Highway, Quezon City',
				latitude: 14.6721,
				longitude: 121.0054,
			},
			{
				location_name: 'Baesa Road / Reparo Road Intersection, Quirino Highway, Quezon City',
				latitude: 14.6756,
				longitude: 121.0042,
			},
			{
				location_name: 'General Hospital, Baesa Road, Quirino Highway, Quezon City',
				latitude: 14.6769,
				longitude: 121.0051,
			},
			{
				location_name: 'Baesa Educational Foundation, Baesa Road, Quirino Highway, Quezon City',
				latitude: 14.6779,
				longitude: 121.0059,
			},
			{
				location_name: 'Baesa Road / Aquino Street Intersection, Quirino Highway, Quezon City',
				latitude: 14.6783,
				longitude: 121.0065,
			},
			{
				location_name: 'Baesa Road / Barnachea Compund Intersection, Quirino Highway, Quezon City',
				latitude: 14.6791,
				longitude: 121.0079,
			},
			{
				location_name: 'Immaculate Mother Learning Center, Baesa Road, Quirino Highway, Quezon City',
				latitude: 14.6801,
				longitude: 121.0089,
			},
			{
				location_name: 'Baesa Road / Roxas Intersection, Quirino Highway, Quezon City',
				latitude: 14.6806,
				longitude: 121.0094,
			},
			{
				location_name: 'St Francis of Assisi Parish Church, Roxas, Quirino Highway, Quezon City',
				latitude: 14.6812,
				longitude: 121.0098,
			},
		],
	},
	{
		route_name: 'SM North EDSA-Luzon Ave (Puregold)',
		category: 'Jeep',
		min_fare: 13,
		locations: [
			{
				location_name: 'SM Hypermarket, North Avenue, Quezon City',
				latitude: 14.6554,
				longitude: 121.0311,
			},
			{
				location_name: 'Mindanao Avenue, Quezon City',
				latitude: 14.656,
				longitude: 121.0355,
			},
			{
				location_name: 'Mindanao Avenue, Quezon City',
				latitude: 14.6574,
				longitude: 121.0359,
			},
			{
				location_name: 'Mindanao Avenue / VMMC, Quezon City',
				latitude: 14.6592,
				longitude: 121.0363,
			},
			{
				location_name: 'Cherry Foodarama, Congressional Avenue, Quezon City',
				latitude: 14.6709,
				longitude: 121.039,
			},
			{
				location_name: 'Congressional Avenue Extension, Quezon City',
				latitude: 14.6735,
				longitude: 121.0508,
			},
			{
				location_name: 'Puregold Commonwealth/Luzon Avenue',
				latitude: 14.6661,
				longitude: 121.0702,
			},
		],
	},
	{
		route_name: 'Pantranco-Proj. 2 & 3 via Kamuning',
		category: 'Jeep',
		min_fare: 13,
		locations: [
			{
				location_name: 'Hyundai, Quezon Avenue, Quezon City',
				latitude: 14.632,
				longitude: 121.0181,
			},
			{
				location_name: 'Quezon Avenue / Roosevelt Avenue Intersection, Quezon City',
				latitude: 14.6326,
				longitude: 121.019,
			},
			{
				location_name: 'Fisher Mall, Quezon Avenue, Quezon City',
				latitude: 14.6334,
				longitude: 121.0202,
			},
			{
				location_name: 'Quezon Avenue, Quezon City',
				latitude: 14.6347,
				longitude: 121.0225,
			},
			{
				location_name: 'Quezon Avenue, Quezon City',
				latitude: 14.6354,
				longitude: 121.0236,
			},
			{
				location_name: 'Quezon Avenue / West Avenue Intersection, Quezon City',
				latitude: 14.6366,
				longitude: 121.0273,
			},
			{
				location_name: 'Timog Ave. / Scout Santiago Intersection, Quezon City',
				latitude: 14.6361,
				longitude: 121.0294,
			},
			{
				location_name: 'Scout Tobias / Timog Ave. Intersection, Quezon City',
				latitude: 14.6358,
				longitude: 121.031,
			},
			{
				location_name: 'Timog Ave. / Scout Tuason Intersection, Quezon City',
				latitude: 14.6354,
				longitude: 121.0331,
			},
			{
				location_name: 'Scout Limbaga, Quezon City',
				latitude: 14.6338,
				longitude: 121.0351,
			},
			{
				location_name: 'Tomas Morato Ave. / Scout De Guia Intersection, Quezon City',
				latitude: 14.6313,
				longitude: 121.0345,
			},
			{
				location_name: 'Tomas Morato Ave. / Marathon',
				latitude: 14.6288,
				longitude: 121.0339,
			},
			{
				location_name: 'Teodoro Gener / Kamuning Rd., Quezon City',
				latitude: 14.628,
				longitude: 121.0363,
			},
			{
				location_name: 'Judge Damien Jimenez / Kamuning Rd., Quezon City',
				latitude: 14.6287,
				longitude: 121.0386,
			},
			{
				location_name: 'Kamuning Rd., Quezon City',
				latitude: 14.6296,
				longitude: 121.0418,
			},
			{
				location_name: 'Kamuning Rd. / Scout Rallos Extension Intersection, Quezon City',
				latitude: 14.6305,
				longitude: 121.0452,
			},
			{
				location_name: 'Kamias Rd. / Colonel Salgado Intersection, Quezon City',
				latitude: 14.631,
				longitude: 121.0468,
			},
			{
				location_name: 'Kamias Rd. / Maliksi St Intersection, Quezon City',
				latitude: 14.6319,
				longitude: 121.0499,
			},
			{
				location_name: 'Kamias Rd / K-I Intersection, Quezon City, Manila',
				latitude: 14.6326,
				longitude: 121.0522,
			},
			{
				location_name: 'Kamias Rd. / Kalayaan Ave. Intersection, Quezon City',
				latitude: 14.6333,
				longitude: 121.0545,
			},
			{
				location_name: 'Kamias Rd. / Kasing-Kasing Intersection, Quezon City',
				latitude: 14.6339,
				longitude: 121.0566,
			},
			{
				location_name: 'Kamias Rd. / Anonas Extension Intersection, Quezon City',
				latitude: 14.6342,
				longitude: 121.0589,
			},
			{
				location_name: 'K-10th / Anonas Intersection, Quezon City, Manila',
				latitude: 14.6334,
				longitude: 121.0591,
			},
			{
				location_name: 'Don Quintin Paredes High School, Anonas, Quezon City',
				latitude: 14.6314,
				longitude: 121.0609,
			},
			{
				location_name: 'Anonas / Marang Intersection, Quezon City',
				latitude: 14.6307,
				longitude: 121.0611,
			},
			{
				location_name: 'Anonas / Molave Intersection, Quezon City',
				latitude: 14.6286,
				longitude: 121.0632,
			},
			{
				location_name: 'Molave / Lawan Intersection, Quezon City',
				latitude: 14.6296,
				longitude: 121.0677,
			},
			{
				location_name: 'Molave / Banuyo Intersection, Quezon City',
				latitude: 14.6302,
				longitude: 121.0689,
			},
		],
	},
	{
		route_name: 'Buendia-MOA',
		category: 'Jeep',
		min_fare: 13,
		locations: [
			{
				location_name: 'Senator Gil Puyat Ave. cor. Taft Ave., Lungsod ng Pasay',
				latitude: 14.5541,
				longitude: 120.9966,
			},
			{
				location_name: 'Senator Gil Puyat Ave., Lungsod ng Pasay',
				latitude: 14.5531,
				longitude: 120.9918,
			},
			{
				location_name: 'Senator Gil Puyat Ave., Lungsod ng Pasay',
				latitude: 14.5513,
				longitude: 120.9856,
			},
			{
				location_name: 'PNB',
				latitude: 14.5487,
				longitude: 120.9866,
			},
			{
				location_name: 'Macapagal Dampa',
				latitude: 14.5451,
				longitude: 120.9874,
			},
			{
				location_name: 'Multinational Avenue, Parañaque City',
				latitude: 14.5431,
				longitude: 120.9878,
			},
			{
				location_name: 'J. W. Diokno Boulevard Station 3',
				latitude: 14.5384,
				longitude: 120.9837,
			},
		],
	},
	{
		route_name: 'Light Rail Transit 2 (LRT2)',
		category: 'Train',
		min_fare: 13,
		locations: [
			{
				location_name: 'Antipolo Station',
				latitude: 14.6249,
				longitude: 121.1212,
			},
			{
				location_name: 'Marikina-Pasig Station',
				latitude: 14.6205,
				longitude: 121.1002,
			},
			{
				location_name: 'Santolan Station',
				latitude: 14.6221,
				longitude: 121.0867,
			},
			{
				location_name: 'Katipunan Station',
				latitude: 14.631,
				longitude: 121.0726,
			},
			{
				location_name: 'Anonas Station',
				latitude: 14.6281,
				longitude: 121.0648,
			},
			{
				location_name: 'Araneta Center-Cubao Station',
				latitude: 14.6228,
				longitude: 121.0527,
			},
			{
				location_name: 'Betty Go-Belmonte Station',
				latitude: 14.6186,
				longitude: 121.0427,
			},
			{
				location_name: 'Gilmore Station',
				latitude: 14.6136,
				longitude: 121.0342,
			},
			{
				location_name: 'J. Ruiz Station',
				latitude: 14.6106,
				longitude: 121.0261,
			},
			{
				location_name: 'V. Mapa Station',
				latitude: 14.6042,
				longitude: 121.0171,
			},
			{
				location_name: 'Pureza Station',
				latitude: 14.6018,
				longitude: 121.0051,
			},
			{
				location_name: 'Legarda Station',
				latitude: 14.6012,
				longitude: 120.9921,
			},
			{
				location_name: 'Recto Station',
				latitude: 14.6036,
				longitude: 120.9835,
			},
		],
	},
	{
		route_name: 'Light Rail Transit 1 (LRT1)',
		category: 'Train',
		min_fare: 13,
		locations: [
			{
				location_name: 'Baclaran Station',
				latitude: 14.5342,
				longitude: 120.9985,
			},
			{
				location_name: 'EDSA Station',
				latitude: 14.5392,
				longitude: 121.0007,
			},
			{
				location_name: 'Libertad Station',
				latitude: 14.5478,
				longitude: 120.9987,
			},
			{
				location_name: 'Gil Puyat Station',
				latitude: 14.5543,
				longitude: 120.9972,
			},
			{
				location_name: 'Vito Cruz Station',
				latitude: 14.5634,
				longitude: 120.9949,
			},
			{
				location_name: 'Quirino Station',
				latitude: 14.5701,
				longitude: 120.9917,
			},
			{
				location_name: 'Pedro Gil Station',
				latitude: 14.5765,
				longitude: 120.9881,
			},
			{
				location_name: 'UN Avenue Station',
				latitude: 14.5824,
				longitude: 120.9848,
			},
			{
				location_name: 'Central Terminal Station',
				latitude: 14.5927,
				longitude: 120.9818,
			},
			{
				location_name: 'Carriedo Station',
				latitude: 14.5991,
				longitude: 120.9813,
			},
			{
				location_name: 'Doroteo Jose Station',
				latitude: 14.6054,
				longitude: 120.9821,
			},
			{
				location_name: 'Bambang Station',
				latitude: 14.6113,
				longitude: 120.9825,
			},
			{
				location_name: 'Tayuman Station',
				latitude: 14.6167,
				longitude: 120.9828,
			},
			{
				location_name: 'Blumentritt Station',
				latitude: 14.6226,
				longitude: 120.983,
			},
			{
				location_name: 'Abad Santos Station',
				latitude: 14.6305,
				longitude: 120.9816,
			},
			{
				location_name: 'R. Papa Station',
				latitude: 14.6361,
				longitude: 120.9824,
			},
			{
				location_name: '5th Avenue Station',
				latitude: 14.6443,
				longitude: 120.9836,
			},
			{
				location_name: 'Monumento Station',
				latitude: 14.6544,
				longitude: 120.984,
			},
			{
				location_name: 'Balintawak Station',
				latitude: 14.6574,
				longitude: 121.0041,
			},
			{
				location_name: 'Fernando Poe Jr. Station',
				latitude: 14.6575,
				longitude: 121.0211,
			},
		],
	},
];

const user_seed = [
	{
		username: 'admin',
		password: '$2b$10$IUOqtTto/j7NBLhC81rrIuVl.cyrjMpJ3uKnmdjxmP3KGnYx2VgLK',
	},
];

const seed = async () => {
	await prisma.users.deleteMany();
	await prisma.routes.deleteMany();
	await prisma.locations.deleteMany();

	for (const user of user_seed) {
		await prisma.users.create({
			data: {
				username: user.username,
				password: user.password,
			},
		});
	}

	for (const route of routes_seed) {
		await prisma.routes.create({
			data: {
				route_name: route.route_name,
				category: route.category,
				min_fare: route.min_fare,
				Locations: {
					create: route.locations,
				},
			},
		});
	}
};

seed();
