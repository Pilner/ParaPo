import React, { useState, useEffect, useRef } from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	type?: string;
	label?: string;
	children?: React.ReactNode;
	placeholder?: string;
	name?: string;
	value?: any;
	onChange?: (value: any) => void;
}

export function TextInput({
	type = 'text',
	name,
	value,
	placeholder,
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
			<label className="text-input-label font-semibold" htmlFor={inputId}>
				{children ?? label}
			</label>
			<div className="w-full overflow-clip drop-shadow-lg">
				<input
					type={type}
					placeholder={placeholder}
					id={inputId}
					name={name}
					className="w-full rounded-2xl border border-dark-gray px-4 py-2"
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
	name?: string;
	options?: { label: string; value: any }[];
	value?: any;
	onChange?: (value: any) => void;
}

export function DropdownInput({
	label,
	children,
	placeholder,
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
			<label className="text-input-label font-semibold" htmlFor={inputId}>
				{children ?? label}
			</label>
			<div className="w-full overflow-clip drop-shadow-lg">
				<select
					id={inputId}
					name={name}
					defaultValue={value ?? 'disabled'}
					onChange={handleChange}
					className={`w-full rounded-2xl border border-dark-gray px-4 py-2`}
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
