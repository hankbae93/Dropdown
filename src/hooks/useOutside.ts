import { RefObject, useEffect } from "react";

type Handler = () => void;

const useOutside = <T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>,
	callback: Handler
) => {
	const handleClick = (e: MouseEvent) => {
		const element = ref?.current;
		if (!element || element.contains(e.target as Node)) {
			return;
		}
		callback();
	};

	useEffect(() => {
		window.addEventListener("click", handleClick);
		return () => {
			window.removeEventListener("click", handleClick);
		};
	}, []);
};

export default useOutside;
