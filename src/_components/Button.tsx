import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'solid' | 'outline';
	type?: 'submit' | 'reset' | 'button';
	children?: React.ReactNode;
	className?: string;
	disabled?: boolean;
}

export default function Button({ variant, type, children, className, disabled, ...otherProps }: ButtonProps) {
	return (
		<button
			type={type}
			className={`flex items-center justify-center rounded-lg px-4 py-2 transition duration-200 ${
				variant === 'solid'
					? 'border border-accent bg-accent text-white hover:border-opacity-100 hover:bg-transparent hover:text-accent'
					: 'border border-accent bg-transparent text-accent hover:border-opacity-0 hover:bg-accent hover:text-white'
			} disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-opacity-100 disabled:hover:bg-accent disabled:hover:text-white ${className ?? ''}`}
			disabled={disabled}
			{...otherProps}
		>
			{children}
		</button>
	);
}

Button.defaultProps = {
	variant: 'solid',
	type: 'button',
	disabled: false,
};
