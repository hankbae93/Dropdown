import axios, { AxiosResponse } from "axios";
import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Dropdown, { DropdownItemProps } from "./components/Dropdown";
import useDropdownBuilder from "./hooks/useDropdownBuilder";
import { useGetKimchies } from "./api";

const Page = () => {
	const { createId, createName, createValue } = useDropdownBuilder();
	const { data: kimchiPeopleList } = useGetKimchies();
	const { data: musicianList } = useQuery(["musician"], () =>
		axios.get("http://localhost:3001/musician")
	);

	console.log(kimchiPeopleList);

	const kimchiList = useMemo(
		() =>
			kimchiPeopleList?.map((kimchi) => {
				console.log(createId(kimchi, "id"));
				return {
					...createId(kimchi, "id"),
					...createName(kimchi, "name"),
					...createValue(kimchi, "value"),
				} as DropdownItemProps;
			}) ?? [],
		[createId, createName, createValue, kimchiPeopleList]
	);

	console.log({ kimchiList });

	return (
		<div>
			<Dropdown list={kimchiList} />
		</div>
	);
};

export default Page;
