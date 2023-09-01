import { useEffect } from 'react';
import useResizer from './useResizer';

/**
 * @param isOpen - a boolean value to determine whether to stop the scrolling or not
 */
export default function useStopScrolling({
	isOpen,
	reverseEffect = false,
}: {
	isOpen: boolean;
	reverseEffect?: boolean;
}) {
	function stopStyleChanges() {
		document.body.style.height = '100vh';
		document.body.style.overflowY = 'hidden';
	}

	function defaultStyles() {
		document.body.style.height = 'auto';
		document.body.style.overflowY = 'auto';
	}

	const { screenResize } = useResizer();

	/** This is just to prevent the background from scrolling when the modal is up */
	useEffect(() => {
		if (screenResize < 1020) {
			if (reverseEffect) {
				if (isOpen === true) {
					stopStyleChanges();
				} else {
					defaultStyles();
				}

				return;
			}

			if (isOpen === false) {
				stopStyleChanges();
			} else {
				defaultStyles();
			}
		}
	}, [isOpen, screenResize]);
}
