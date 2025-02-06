import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { GetLocationData } from '@/_types/GetData';

const headers = {
	'Content-Type': 'application/json',
};

const fetchOneLocation = async (location_id: string | number) => {
	const response = await fetch(`api/get/location/${location_id}`);
	const data: any = await response.json();
	return data;
};

const fetchAllLocations = async (page?: number, all?: boolean) => {
	const response = await fetch(
		`/api/get/location${page || all ? '?' : ''}${page ? `page=${page}` : ''}${page && all ? '&' : ''}${all ? `all=${all}` : ''}`
	);
	const data: GetLocationData = await response.json();
	return data;
};

const searchLocations = async (keyword: string, page?: number, all?: boolean) => {
	const response = await fetch(
		`/api/get/location/search/${keyword}${page || all ? '?' : ''}${page ? `page=${page}` : ''}${page && all ? '&' : ''}${
			all ? `all=${all}` : ''
		}`
	);
	const data: GetLocationData = await response.json();
	return data;
};

const createLocation = async (location: any) => {
	const response = await fetch(`/api/post/location`, {
		method: 'POST',
		body: JSON.stringify(location),
		headers: headers,
	});

	if (!response.ok) {
		throw new Error('An error occurred');
	}

	const data = await response.json();

	return data.data;
};

const updateLocation = async (location: any) => {
	const response = await fetch(`/api/update/location/${location.location_id}`, {
		method: 'PUT',
		body: JSON.stringify(location),
		headers: headers,
	});

	if (!response.ok) {
		throw new Error('An error occurred');
	}

	const data = await response.json();

	return data.data;
};

// ------------------

export const useGetLocation = (location_id: string | number) => {
	return useQuery({
		queryKey: ['location', location_id],
		queryFn: () => fetchOneLocation(location_id),
		enabled: !!location_id,
	});
};

export const useGetLocations = (page?: number, all?: boolean) => {
	return useQuery({
		queryKey: ['locations', `page-${page}`],
		queryFn: () => fetchAllLocations(page, all),
	});
};

export const useSearchLocations = (keyword: string, page?: number, all?: boolean) => {
	return useQuery({
		queryKey: ['search', 'locations', keyword, `page-${page}`],
		queryFn: () => searchLocations(keyword, page, all),
		enabled: !!keyword,
	});
};

export const usePostLocation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createLocation,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['locations'] });
		},
	});
};

export const usePutLocation = (location_id: string | number) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateLocation,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['location', location_id] });
			queryClient.invalidateQueries({ queryKey: ['locations'] });
		},
	});
};
