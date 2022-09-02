import React from "react";

type BuilderFunction = <T extends Record<string, any>>(
	obj: T,
	key: keyof T | "value"
) => object;

const useDropdownBuilder = () => {
	const createId: BuilderFunction = (obj, key) => {
		return { id: obj[key] };
	};

	const createName: BuilderFunction = (obj, key) => {
		return { name: obj[key] };
	};

	const createValue: BuilderFunction = (obj, key) => {
		return { value: obj[key] };
	};

	return { createId, createName, createValue };
};

export default useDropdownBuilder;
