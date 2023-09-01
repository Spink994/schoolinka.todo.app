import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	className?: string;
	variant?: string;
	size?: string;
}

const Button: FC<ButtonProps> = ({
	children,
	className = '',
	variant = 'base',
	size = 'base',
	...rest
}) => {
	const variants: Record<string, string> = {
		base: 'bg-[#3F5BF6] text-white hover:opacity-80 transition-all duration-[200] active:scale-[1.02] flex items-center justify-center gap-3',
	};

	const sizes: Record<string, string> = {
		base: 'py-1 h-[40px] w-full px-4 text-sm rounded-[8px]',
	};

	return (
		<button
			className={`${className} ${variants[variant]} ${sizes[size]}`}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;
