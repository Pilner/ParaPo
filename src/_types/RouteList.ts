import { Route } from '@/_types/Models';

export default interface RouteList {
	minRoute: Route;
	bestIndex: {
		origin: number;
		dest: number;
	};
}
