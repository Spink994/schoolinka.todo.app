import React from 'react';
import ReactDOM from 'react-dom';
import { MdOutlineClose } from 'react-icons/md';
import { createRoot } from 'react-dom/client';

type AlertType = 'error' | 'success' | 'warning' | 'danger';

interface NotifyProps {
	title?: React.ReactNode;
	body?: React.ReactNode;
	duration?: number;
	type?: AlertType;
}

/**
 * @param title - The title of the notify component
 * @param body - The message body to be rendered
 * @param duration - The duration for which the component will stay rendered
 * @param type - The error type which is one of `error` | `success` | `warning` | `danger`
 * @returns - void
 */
export default function Notify() {
	function renderNotification({ ...props }: NotifyProps) {
		/** Destructuring the the props in order to assign some default values */
		const {
			title = 'Alert!',
			body = 'This is an alert element',
			type = 'success',
			duration = 5000,
		} = props;

		/* Setting the styles of the notification alert based on the type of error */
		const borderBottom =
			type === 'success'
				? 'border-b-[10px] border-[#00FF00]'
				: 'border-b-[10px] border-rose-600';

		/* Checking if there is an old portal that is still being rendered  before rendering a new one -
        all the add and remove classes is just to animate the
        portal while removing it from the DOM, one could use framer-motion to animate the presence, but this also works. 😎 */
		const oldEl = document.body.querySelector('#root-portal');

		/**  Creating a new instance of the alert/portal element that will be added to the DOM upon calling it */
		const el = document.createElement('div');
		el.id = 'root-portal';

		if (oldEl) {
			oldEl.classList.remove('top-4');
			oldEl.classList.add('top-32');
			document.body.appendChild(el);
		}

		document.body.appendChild(el);
		el.className =
			'fixed z-[5000000] shadow-lg rounded-lg right-[-100vw] top-4 transition-all duration-[500]';
		// This part is to animate the portal upon entry
		setTimeout(() => {
			el.classList.remove('right-[-100vw]');
			el.classList.add('right-4');
		}, 500);

		/** The basic structure of the alert element/component */
		function NotifyBaseElement() {
			return (
				<div
					className={`flex min-h-[100px] w-[300px] flex-col bg-white p-4 ${borderBottom}`}
				>
					<div className="flex justify-between gap-3 text-base font-[600]">
						{title}{' '}
						<MdOutlineClose
							onClick={() => document.body.removeChild(el)}
							className="cursor-pointer"
						/>
					</div>
					<div className="mt-2 text-sm font-[500] text-black/60">
						{body}
					</div>
				</div>
			);
		}

		// Initiating the portal which adds it to the DOM
		createRoot(el).render(ReactDOM.createPortal(<NotifyBaseElement />, el));

		// Removes the portal after the specified duration has elapsed
		setTimeout(() => {
			document.body.removeChild(el);
		}, duration);
	}

	return renderNotification;
}
