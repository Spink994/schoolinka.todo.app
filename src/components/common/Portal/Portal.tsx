import React from "react";
import { createRoot } from "react-dom/client";
import { GrFormClose } from "react-icons/gr";

export default function Portal() {
	const portalElement = document.createElement("div");
	portalElement.id = "root-portal-2";
	portalElement.className =
		"fixed z-[50000000] w-screen h-screen bg-black/20 backdrop-blur-lg translate-x-[200vw] top-0 transition-all duration-[800]";

	/**
	 * This function removes and destroys the modal once it is initiated
	 */
	function removeChild() {
		portalElement.classList.remove("translate-x-0");
		portalElement.classList.add("translate-x-[200vw]");

		document.body.querySelector("#root-portal-2")?.remove();
	}

	/**
	 * This function closes the modal once you click on the dark blurry backdrop
	 */
	portalElement.onclick = (e) => {
		const { target } = e;
		if (target instanceof HTMLDivElement && target.id === "root-portal-2")
			removeChild();
		else return;
	};

	/**
	 * This function animates the modal once it is initiated
	 */
	function showChild() {
		portalElement.classList.remove("translate-x-[200vw]");
		portalElement.classList.add("translate-x-0");
	}

	const root = createRoot(portalElement);

	/**
	 * This function initiates the rendering of the portal
	 */
	const renderPortal = (children: React.ReactNode) => {
		document.body.appendChild(portalElement);

		const RenderedComponent = (
			<div className="parent relative ml-auto flex h-full w-full min-w-[250px] max-w-max bg-white pt-8">
				<GrFormClose
					onClick={() => removeChild()}
					className="absolute right-4 top-4 w-8 text-xl"
				/>
				{/* The main content */}
				{children}
			</div>
		);

		root.render(RenderedComponent);

		/**
		 * This trick is just to allow for the transition animation to be noticed by the user of the app
		 */
		setTimeout(() => {
			showChild();
		}, 50);
	};

	return renderPortal;
}
