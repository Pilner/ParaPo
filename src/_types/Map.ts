export interface Route {
	route_name: string;
	category: string;
	min_fare: number;
	Locations: Location[];
}

export interface Location {
	location_name: string;
	longitude: number;
	latitude: number;
}
