import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { GetRouteData } from '@/_types/GetData';

const headers = {
	'Content-Type': 'application/json',
};

const fetchOneRoute = async (route_id: string | number) => {
	const response = await fetch(`/api/get/route/${route_id}`);
	const data: any = await response.json();
	return data;
};

const fetchAllRoutes = async (page?: number, all?: boolean) => {
	const response = await fetch(
		`/api/get/route${page || all ? '?' : ''}${page ? `page=${page}` : ''}${page && all ? '&' : ''}${all ? `all=${all}` : ''}`
	);
	const data: GetRouteData = await response.json();
	return data;
};

const searchRoutes = async (searchInput: string, page?: number, all?: boolean) => {
	const response = await fetch(
		`/api/get/route/search/${searchInput}${page || all ? '?' : ''}${page ? `page=${page}` : ''}${page && all ? '&' : ''}${
			all ? `all=${all}` : ''
		}`
	);
	const data: GetRouteData = await response.json();
	return data;
};

const createRoute = async (route: any) => {
	const response = await fetch(`/api/post/route`, {
		method: 'POST',
		body: JSON.stringify(route),
		headers: headers,
	});

	if (!response.ok) {
		const data = await response.json();
		throw new Error(data.message);
	}

	const data = await response.json();

	return data;
};

const updateRoute = async (route: any) => {
	const response = await fetch(`/api/update/route/${route.route_id}`, {
		method: 'PUT',
		body: JSON.stringify(route),
		headers: headers,
	});

	if (!response.ok) {
		const data = await response.json();
		throw new Error(data.message);
	}

	const data = await response.json();

	return data;
};

const deleteRoute = async (route_id: string | number) => {
	const response = await fetch(`/api/delete/route/${route_id}`, {
		method: 'DELETE',
		headers: headers,
	});

	if (!response.ok) {
		const data = await response.json();
		throw new Error(data.message);
	}

	const data = await response.json();

	return data;
};

// ------------------

export const useGetRoute = (route_id: string | number) => {
	return useQuery({
		queryKey: ['route', route_id],
		queryFn: () => fetchOneRoute(route_id),
		enabled: !!route_id,
	});
};

export const useGetRoutes = (page?: number, all?: boolean) => {
	return useQuery({
		queryKey: ['routes', `page-${page}`],
		queryFn: () => fetchAllRoutes(page, all),
	});
};

export const useSearchRoutes = (searchInput: string, page?: number, all?: boolean) => {
	return useQuery({
		queryKey: ['search', 'routes', searchInput, `page-${page}`],
		queryFn: () => searchRoutes(searchInput, page, all),
		enabled: !!searchInput,
	});
};

export const usePostRoute = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createRoute,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['routes'] });
			return data;
		},
	});
};

export const usePutRoute = (route_id: string | number) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateRoute,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['route', route_id] });
			queryClient.invalidateQueries({ queryKey: ['routes'] });
		},
	});
};

export const useDeleteRoute = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteRoute,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['routes'] });
		},
	});
};
