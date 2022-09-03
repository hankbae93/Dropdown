import React, { useMemo } from "react";
import Dropdown, { DropdownItemProps } from "./components/Dropdown";
import useDropdownBuilder from "./hooks/useDropdownBuilder";
import { useGetKimchies, useGetMusicians } from "./api";

const Page = () => {
	const { createId, createName, createValue } = useDropdownBuilder();
	const { data: kimchiPeopleList } = useGetKimchies();
	const { data: musicianList } = useGetMusicians();

	const kimchiList = useMemo(
		() =>
			kimchiPeopleList?.map((kimchi) => {
				return {
					...createId(kimchi, "id"),
					...createName(kimchi, "name"),
					...createValue(kimchi, "value"),
				} as DropdownItemProps;
			}) ?? [],
		[createId, createName, createValue, kimchiPeopleList]
	);

	const musicianDroplist = useMemo(
		() =>
			musicianList?.map((musician) => {
				return {
					...createId(musician, "musicianId"),
					...createName(musician, "name"),
					...createValue(musician, "value"),
				} as DropdownItemProps;
			}) ?? [],
		[createId, createName, createValue, kimchiPeopleList]
	);

	return (
		<div>
			<Dropdown list={kimchiList} unqiue='kimchi' />
			<Dropdown list={musicianDroplist} unqiue='music' />
		</div>
	);
};

export default Page;
