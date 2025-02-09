import React, { useState, useEffect, useRef } from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	type?: string;
	label?: string;
	children?: React.ReactNode;
	placeholder?: string;
	error?: string;
	name?: string;
	value?: any;
	onChange?: (value: any) => void;
}

export function TextInput({
	type = 'text',
	name,
	value,
	placeholder,
	error,
	label,
	children,
	onChange,
	...otherProps
}: TextInputProps) {
	const inputId = `input_${name}`;

	const handleChange = async (e: any) => {
		e.preventDefault();
		onChange && onChange(e.target.value);
	};

	return (
		<div className="relative w-full">
			<div className="flex">
				<label className="text-input-label font-semibold" htmlFor={inputId}>
					{children ?? label}
				</label>
				{(error || error === '') && (
					<p className="duration-20 ml-auto text-input-label font-semibold text-red-500 transition">{error}</p>
				)}
			</div>
			<div
				className={`duration-20 w-full overflow-clip rounded-2xl border drop-shadow-sm transition ${error || error === '' ? 'border-red-500' : 'border-dark-gray'}`}
			>
				<input
					type={type}
					placeholder={placeholder}
					id={inputId}
					name={name}
					className={`w-full rounded-2xl border px-4 py-2 ${error || error === '' ? 'border-transparent focus:outline-none' : 'border-dark-gray focus:border-dark-gray focus:outline-black/25'}`}
					value={value}
					onChange={handleChange}
					{...otherProps}
				/>
			</div>
		</div>
	);
}

interface DropdownInputProps extends React.InputHTMLAttributes<HTMLSelectElement> {
	label?: string;
	children?: React.ReactNode;
	placeholder?: string;
	error?: string;
	name?: string;
	options?: { label: string; value: any }[];
	value?: any;
	onChange?: (value: any) => void;
}

export function DropdownInput({
	label,
	children,
	placeholder,
	error,
	name,
	options,
	value,
	onChange,
	...otherProps
}: DropdownInputProps) {
	const inputId = `input_${Math.random().toString(36).substr(2, 9)}`;

	const handleChange = async (e: any) => {
		e.preventDefault();
		onChange && onChange(e.target.value);
	};

	return (
		<div className="relative w-full">
			<div className="flex">
				<label className="text-input-label font-semibold" htmlFor={inputId}>
					{children ?? label}
				</label>
				{(error || error === '') && (
					<p className="duration-20 ml-auto text-input-label font-semibold text-red-500 transition">{error}</p>
				)}
			</div>
			<div
				className={`duration-20 w-full overflow-clip rounded-2xl border drop-shadow-sm transition ${error || error === '' ? 'border-red-500' : 'border-dark-gray'}`}
			>
				<select
					id={inputId}
					name={name}
					defaultValue={value ?? 'disabled'}
					onChange={handleChange}
					className={`w-full rounded-2xl border px-4 py-2 ${error || error === '' ? 'border-transparent focus:outline-none' : 'border-dark-gray focus:border-dark-gray focus:outline-black/25'}`}
					{...otherProps}
				>
					{placeholder && (
						<option value="disabled" disabled>
							{placeholder}
						</option>
					)}
					{options &&
						options.map((option, index) => (
							<option key={index} value={option.value}>
								{option.label}
							</option>
						))}
				</select>
			</div>
		</div>
	);
}
