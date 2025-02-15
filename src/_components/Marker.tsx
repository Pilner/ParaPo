import React from 'react';

interface MarkerProps {
	point: string;
	getDataFromChild: any;
	color: string;
	className?: string;
}

export default function Marker({ point, color, className, getDataFromChild }: MarkerProps) {
	const handleClick = () => {
		getDataFromChild(point);
	};

	return (
		<div className="items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="46"
				height="46"
				viewBox="0 0 36 46"
				fill="none"
				className={`float-right cursor-pointer rounded-lg border border-[rgba(0,0,0,0.2)] ${className ?? className} h-10 w-10 lg:h-12 lg:w-12`}
				data-index={point}
				data-selected="false"
				onClick={handleClick}
			>
				<path
					d="M18 0C13.2278 0.0056522 8.65274 1.91142 5.27831 5.29924C1.90388 8.68707 0.00564901 13.2803 1.91502e-05 18.0714C-0.00569649 21.9867 1.26817 25.7958 3.6262 28.9143C3.6262 28.9143 4.11711 29.5632 4.19729 29.6569L18 46L31.8093 29.6486C31.8813 29.5616 32.3738 28.9143 32.3738 28.9143L32.3754 28.9094C34.7323 25.7922 36.0056 21.9849 36 18.0714C35.9944 13.2803 34.0961 8.68707 30.7217 5.29924C27.3473 1.91142 22.7722 0.0056522 18 0ZM18 24.6429C16.7054 24.6429 15.4399 24.2575 14.3635 23.5354C13.2872 22.8133 12.4482 21.787 11.9528 20.5862C11.4574 19.3854 11.3278 18.0641 11.5803 16.7894C11.8329 15.5147 12.4563 14.3438 13.3717 13.4247C14.2871 12.5057 15.4534 11.8798 16.723 11.6263C17.9927 11.3727 19.3088 11.5028 20.5048 12.0002C21.7009 12.4976 22.7231 13.3399 23.4423 14.4205C24.1616 15.5012 24.5454 16.7717 24.5454 18.0714C24.5433 19.8136 23.853 21.4838 22.6259 22.7157C21.3989 23.9476 19.7353 24.6407 18 24.6429Z"
					fill={color}
				/>
			</svg>
		</div>
	);
}
