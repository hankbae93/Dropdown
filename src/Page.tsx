import React, { useMemo } from "react";
import Dropdown, { DropdownItemProps } from "./components/Dropdown";
import useDropdownBuilder from "./hooks/useDropdownBuilder";
import { useGetKimchies, useGetMusicians } from "./api";

const Page = () => {
	const { createDropdownlist } = useDropdownBuilder();
	const { data: kimchiPeopleList } = useGetKimchies();
	const { data: musicianList } = useGetMusicians();

	const kimchiList = useMemo(
		() =>
			kimchiPeopleList?.map((kimchi) => {
				return createDropdownlist(kimchi)
					.createId("id")
					.createName("name")
					.build();
			}) ?? [],
		[kimchiPeopleList]
	);

	return <Dropdown list={kimchiList} unqiue='kimchi' />;
};

export default Page;
