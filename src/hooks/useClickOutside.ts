import { useEffect } from 'react';

export function useHandleClickOutside(
	ref: React.RefObject<HTMLElement>,
	callback: () => void
): void {
	const handleClick = (event: MouseEvent): void => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [ref, callback]);
}
