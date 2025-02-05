import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'solid' | 'outline';
	type?: 'submit' | 'reset' | 'button';
	theme?: 'success' | 'danger' | 'accent';
	children?: React.ReactNode;
	className?: string;
	disabled?: boolean;
}

export default function Button({
	variant = 'solid',
	type = 'button',
	theme = 'accent',
	children,
	className,
	disabled = false,
	...otherProps
}: ButtonProps) {
	const themeVariants = {
		solid: {
			accent: 'border-accent bg-accent text-white hover:text-accent disabled:hover:bg-accent disabled:hover:text-white',
			success:
				'border-green-600 bg-green-600 text-white hover:text-green-600 disabled:hover:bg-green-600 disabled:hover:text-white',
			danger:
				'border-red-600 bg-red-600 text-white hover:text-red-600 disabled:hover:bg-red-600 disabled:hover:text-white',
		},
		outline: {
			accent:
				'border-accent text-accent hover:bg-accent hover:text-white disabled:hover:bg-transparent disabled:hover:text-accent',
			success:
				'border-green-600 text-green-600 hover:bg-green-600 hover:text-white disabled:hover:bg-transparent disabled:hover:text-green-600',
			danger:
				'border-red-600 text-red-600 hover:bg-red-600 hover:text-white disabled:hover:bg-transparent disabled:hover:text-red-600',
		},
	};

	return (
		<button
			type={type}
			className={`flex items-center justify-center rounded-lg border px-2 sm:px-4 py-1 sm:py-2 transition duration-200 ${
				variant === 'solid'
					? `hover:border-opacity-100 hover:bg-transparent ${themeVariants.solid[theme]}`
					: `bg-transparent hover:border-opacity-0 ${themeVariants.outline[theme]}`
			} disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-opacity-100 ${className ?? ''}`}
			disabled={disabled}
			{...otherProps}
		>
			{children}
		</button>
	);
}
