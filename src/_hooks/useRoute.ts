import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const headers = {
	'Content-Type': 'application/json',
};

const fetchOneRoute = async (route_id: string | number) => {
	const response = await fetch(`/api/get/route/${route_id}`);
	const data: any = await response.json();
	return data;
};

const fetchAllRoutes = async () => {
	const response = await fetch('/api/get/route');
	const data: any[] = await response.json();
	return data;
};

const searchRoutes = async (searchInput: string) => {
	const response = await fetch(`/api/get/route/search/${searchInput}`);
	const data: any[] = await response.json();
	return data;
};

const createRoute = async (route: any) => {
	const response = await fetch(`/api/post/route`, {
		method: 'POST',
		body: JSON.stringify(route),
		headers: headers,
	});

	if (!response.ok) {
		throw new Error('An error occurred');
	}

	const data = await response.json();

	return data.data;
};

const updateRoute = async (route: any) => {
	const response = await fetch(`/api/update/route/${route.route_id}`, {
		method: 'PUT',
		body: JSON.stringify(route),
		headers: headers,
	});

	if (!response.ok) {
		throw new Error('An error occurred');
	}

	const data = await response.json();

	return data.data;
};

const deleteRoute = async (route_id: string | number) => {
	const response = await fetch(`/api/delete/route/${route_id}`, {
		method: 'DELETE',
		headers: headers,
	});

	if (!response.ok) {
		throw new Error('An error occurred');
	}
};

// ------------------

export const useGetRoute = (route_id: string | number) => {
	return useQuery({
		queryKey: ['route', route_id],
		queryFn: () => fetchOneRoute(route_id),
		enabled: !!route_id,
	});
};

export const useGetRoutes = () => {
	return useQuery({
		queryKey: ['routes'],
		queryFn: fetchAllRoutes,
	});
};

export const useSearchRoutes = (searchInput: string) => {
	return useQuery({
		queryKey: ['search', searchInput],
		queryFn: () => searchRoutes(searchInput),
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
			// queryClient.invalidateQueries({ queryKey: ['route', route_id] });
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
