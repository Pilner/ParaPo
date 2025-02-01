export interface User {
	user_id: string;
	username: string;
	created_at: string;
	updated_at: string;
}

export interface Route {
	route_id: number;
	route_name: string;
	category: string;
	min_fare: number;
	Locations: Location[];
	created_at: string;
	updated_at: string;
}

export interface Location {
	location_id: number;
	location_name: string;
	longitude: number;
	latitude: number;
	created_at: string;
	updated_at: string;
}
