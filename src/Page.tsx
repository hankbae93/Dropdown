import { useMemo } from "react";
import Dropdown from "./components/Dropdown";
import useDropdownBuilder from "./hooks/useDropdownBuilder";
import { useGetKimchies } from "./api";

const Page = () => {
	const { DropdownPropsBuilder } = useDropdownBuilder();
	const { data: kimchiPeopleList } = useGetKimchies();

	const kimchiList = useMemo(
		() =>
			kimchiPeopleList?.map((kimchi) => {
				return DropdownPropsBuilder(kimchi)
					.createId("id")
					.createName("name")
					.build();
			}) ?? [],
		[kimchiPeopleList]
	);

	return <Dropdown list={kimchiList} unqiue='kimchi' />;
};

export default Page;
