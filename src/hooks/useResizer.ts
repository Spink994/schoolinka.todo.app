import { useEffect, useState } from 'react';

export default function useResizer() {
	const [screenResize, setScreenResize] = useState<number>(() => 0);

	useEffect(() => {
		setScreenResize(() => window.innerWidth);
		window.addEventListener('resize', () =>
			setScreenResize(() => window.innerWidth)
		);

		return () =>
			window.removeEventListener('resize', () =>
				setScreenResize(() => window.innerWidth)
			);
	}, []);

	return { screenResize };
}
