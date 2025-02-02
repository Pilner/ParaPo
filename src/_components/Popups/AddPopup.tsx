import React, { useState } from 'react';
import { User, Route, Location } from '@/_types/Models';
import { TextInput, DropdownInput } from '@/_components/Input';
import Button from '@/_components/Button';

import { validateUserSchema } from '@/_validation/userSchema';

import { usePostUser } from '@/_hooks/useUser';
import { toast } from 'react-toastify';

interface PopupProps {
	onCancel: () => void;
}

export function AddUserPopup({ onCancel }: PopupProps) {
	const [inputError, setInputError] = useState<Record<string, string> | null>(null);

	const { mutate: updateUser } = usePostUser();

	const handleCancel = () => {
		onCancel();
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		let data = new FormData(e.currentTarget);
		let payload = {
			username: data.get('username'),
			password: data.get('password'),
			confirmPassword: data.get('confirmPassword'),
		};
		console.log(payload);

		const errors = await validateUserSchema(payload);
		if (errors) {
			setInputError(errors);
			console.error(errors);
			return;
		} else {
			setInputError(null);
		}

		try {
			updateUser(payload, {
				onSuccess: (data) => {
					toast.success('User created successfully');
					console.log(data);
					handleCancel();
				},
				onError: (error) => {
					console.error('Error creating user:', error);
					throw new Error(error.message);
				},
			});
		} catch (error) {
			console.error(error);
			toast.error('Failed to create user');
		}
	};

	return (
		<>
			<div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
				<form
					onSubmit={handleSubmit}
					className="flex w-full max-w-[50rem] flex-col gap-8 overflow-hidden rounded-lg bg-white p-6 text-black"
				>
					<div className="flex items-center justify-between">
						<h3 className="text-primary text-2xl font-bold">Add User</h3>
						<button onClick={handleCancel}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="size-6 opacity-50 hover:opacity-100"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
					<div className="flex w-full flex-col gap-4">
						<TextInput
							label="Username"
							name="username"
							placeholder="Enter Username"
							error={inputError?.username || undefined}
							onChange={() => {}}
						/>
						<TextInput
							type="password"
							name="password"
							label="Password"
							placeholder="Enter Password"
							error={inputError?.password || undefined}
							onChange={() => {}}
						/>
						<TextInput
							type="password"
							name="confirmPassword"
							label="Confirm Password"
							placeholder="Confirm Password"
							error={inputError?.confirmPassword || undefined}
							onChange={() => {}}
						/>
					</div>
					<div className="mt-auto flex justify-between">
						<Button variant="outline" onClick={handleCancel} className="text-primary rounded-lg">
							Cancel
						</Button>
						<Button variant="solid" theme="success" type="submit" className="rounded-lg">
							Save
						</Button>
					</div>
				</form>
			</div>
		</>
	);
}
