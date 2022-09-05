import { useMemo } from "react";
import Dropdown from "./components/Dropdown";
import { useGetKimchies } from "./api";
import convertToDropdownList from "./utils/convertToDropdownData";

const Page = () => {
	const { data: kimchiPeopleList, isSuccess } = useGetKimchies();

	const kimchiList = useMemo(
		() =>
			isSuccess ? convertToDropdownList(kimchiPeopleList, "id", "name") : [],
		[isSuccess, kimchiPeopleList]
	);

	return <Dropdown list={kimchiList} unqiue='kimchi' />;
};

export default Page;
