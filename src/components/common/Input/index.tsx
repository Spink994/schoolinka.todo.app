import { FC, InputHTMLAttributes, ReactNode, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	prefixIcon?: ReactNode;
	suffixIcon?: ReactNode;
}

const Input: FC<InputProps> = ({
	className = "",
	prefixIcon,
	suffixIcon,
	type,
	...rest
}) => {
	const [togglePassword, setTogglePassword] = useState("password");
	return (
		<div className="group flex items-stretch">
			<input
				type={type === "password" ? togglePassword : type}
				className={`${className} peer w-full bg-gray-1 focus:border-primary-6 focus:outline-none group-hover:border-primary-6 ${
					prefixIcon ? "rounded-r-lg border-l-0" : "rounded-l-lg"
				} ${suffixIcon ? "rounded-r-none border-r-0" : "rounded-r-lg"}`}
				{...rest}
			/>
			{prefixIcon && (
				<div className="order-first inline-flex items-center rounded-xl rounded-r-none border border-r-0 bg-gray-1 p-[14px] group-hover:border-primary-6 peer-focus:border-primary-6">
					{prefixIcon}
				</div>
			)}
			{suffixIcon && (
				<button
					type="button"
					onClick={() => {
						setTogglePassword(togglePassword === "text" ? "password" : "text");
					}}
					className="inline-flex  items-center rounded-xl rounded-l-none border border-l-0 border-r bg-gray-1 p-[14px] group-hover:border-primary-6 peer-focus:border-primary-6"
				>
					{suffixIcon}
				</button>
			)}
		</div>
	);
};

export default Input;
