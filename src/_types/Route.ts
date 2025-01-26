export default interface RouteProps {
	route_id: number;
	route_name: string;
	category: string;
	min_fare: number;
	Locations: {
		location_name: string;
		location_id: number;
		latitude: number;
		longitude: number;
	}[];
}
