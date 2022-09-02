import React, { useState } from "react";
import Checkbox from "./Checkbox";
import {
	DropdownButton,
	DropdownList,
	DropdownListItem,
	DropdownWrapper,
} from "./Dropdown.style";

export interface DropdownItemProps {
	id: any;
	name: any;
	value: any;
}

interface Props {
	list: DropdownItemProps[];
}

const Dropdown = ({ list }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState<DropdownItemProps>();

	return (
		<DropdownWrapper>
			<DropdownButton onClick={() => setIsOpen((prev) => !prev)}>
				메뉴
			</DropdownButton>

			<DropdownList isOpen={isOpen}>
				{list.map((data) => {
					return (
						<DropdownListItem key={data.id}>
							<Checkbox
								id={data.id}
								value={data.name}
								prefix={""}
								icon={""}
								label={""}
								onChange={() => data.id === selectedValue?.id}
							/>
						</DropdownListItem>
					);
				})}
			</DropdownList>
		</DropdownWrapper>
	);
};

export default Dropdown;
