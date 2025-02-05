import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const headers = {
	'Content-Type': 'application/json',
};

const fetchOneUser = async (user_id: string | number) => {
	const response = await fetch(`api/get/user/${user_id}`);
	const data: any = await response.json();
	return data;
};

const fetchAllUsers = async () => {
	const response = await fetch('/api/get/user');
	const data: any[] = await response.json();
	return data;
};

const searchUsers = async (searchInput: string) => {
	const response = await fetch(`/api/get/user/search/${searchInput}`);
	const data: any[] = await response.json();
	return data;
};

const createUser = async (user: any) => {
	const response = await fetch(`/api/post/user`, {
		method: 'POST',
		body: JSON.stringify(user),
		headers: headers,
	});

	if (!response.ok) {
		throw new Error('An error occurred');
	}

	const data = await response.json();

	return data.data;
};

const updateUser = async (user: any) => {
	const response = await fetch(`/api/update/user/${user.user_id}`, {
		method: 'PUT',
		body: JSON.stringify(user),
		headers: headers,
	});

	if (!response.ok) {
		throw new Error('An error occurred');
	}

	const data = await response.json();

	return data.data;
};

const deleteUser = async (user_id: string | number) => {
	const response = await fetch(`/api/delete/user/${user_id}`, {
		method: 'DELETE',
		headers: headers,
	});

	if (!response.ok) {
		throw new Error('An error occurred');
	}

	const data = await response.json();

	return data.data;
};

// ------------------

export const useGetUser = (user_id: string | number) => {
	return useQuery({
		queryKey: ['user', user_id],
		queryFn: () => fetchOneUser(user_id),
		enabled: !!user_id,
	});
};

export const useGetUsers = () => {
	return useQuery({
		queryKey: ['users'],
		queryFn: fetchAllUsers,
	});
};

export const useSearchUsers = (searchInput: string) => {
	return useQuery({
		queryKey: ['search', 'users', searchInput],
		queryFn: () => searchUsers(searchInput),
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
