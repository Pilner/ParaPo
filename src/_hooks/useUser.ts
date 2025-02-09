import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { GetUserData } from '@/_types/GetData';

const headers = {
	'Content-Type': 'application/json',
};

const fetchOneUser = async (user_id: string | number) => {
	const response = await fetch(`api/get/user/${user_id}`);
	const data: any = await response.json();
	return data;
};

const fetchAllUsers = async (page?: number, all?: boolean) => {
	const response = await fetch(
		`/api/get/user${page || all ? '?' : ''}${page ? `page=${page}` : ''}${page && all ? '&' : ''}${all ? `all=${all}` : ''}`
	);
	const data: GetUserData = await response.json();
	return data;
};

const searchUsers = async (searchInput: string, page?: number, all?: boolean) => {
	const response = await fetch(
		`/api/get/user/search/${searchInput}${page || all ? '?' : ''}${page ? `page=${page}` : ''}${page && all ? '&' : ''}${
			all ? `all=${all}` : ''
		}`
	);
	const data: GetUserData = await response.json();
	return data;
};

const createUser = async (user: any) => {
	const response = await fetch(`/api/post/user`, {
		method: 'POST',
		body: JSON.stringify(user),
		headers: headers,
	});

	if (!response.ok) {
		const data = await response.json();
		throw new Error(data.message);
	}

	const data = await response.json();

	return data;
};

const updateUser = async (user: any) => {
	const response = await fetch(`/api/update/user/${user.user_id}`, {
		method: 'PUT',
		body: JSON.stringify(user),
		headers: headers,
	});

	if (!response.ok) {
		const data = await response.json();
		throw new Error(data.message);
	}

	const data = await response.json();
	console.log(data);

	return data;
};

const deleteUser = async (user_id: string | number) => {
	const response = await fetch(`/api/delete/user/${user_id}`, {
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

export const useGetUser = (user_id: string | number) => {
	return useQuery({
		queryKey: ['user', user_id],
		queryFn: () => fetchOneUser(user_id),
		enabled: !!user_id,
	});
};

export const useGetUsers = (page?: number, all?: boolean) => {
	return useQuery({
		queryKey: ['users', `page-${page}`],
		queryFn: () => fetchAllUsers(page, all),
	});
};

export const useSearchUsers = (searchInput: string, page?: number, all?: boolean) => {
	return useQuery({
		queryKey: ['search', 'users', searchInput, `page-${page}`],
		queryFn: () => searchUsers(searchInput, page, all),
		enabled: !!searchInput,
	});
};

export const usePostUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
		},
	});
};

export const usePutUser = (user_id: string | number) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user', user_id] });
			queryClient.invalidateQueries({ queryKey: ['users'] });
		},
	});
};

export const useDeleteUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
		},
	});
};
