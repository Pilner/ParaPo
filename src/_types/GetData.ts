import { Route, User, Location } from './Models';

export type GetUserData = {
	users: User[];
	totalUsers: number;
	page: number;
	limit: number;
};

export type GetRouteData = {
	routes: Route[];
	totalRoutes: number;
	page: number;
	limit: number;
};

export type GetLocationData = {
	locations: Location[];
	totalLocations: number;
	page: number;
	limit: number;
};
