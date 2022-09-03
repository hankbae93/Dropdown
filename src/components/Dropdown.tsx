import { ChangeEvent, memo, useEffect, useRef, useState } from "react";
import useOutside from "../hooks/useOutside";
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
	onChangeCb?: (found: DropdownItemProps) => DropdownItemProps["value"];
	unqiue: string;
}

const Dropdown = ({ list, onChangeCb, unqiue }: Props) => {
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(true);
	const [selectedValue, setSelectedValue] = useState<
		DropdownItemProps | undefined
	>(list[0]);

	const handleListOpen = () => setIsOpen((prev) => !prev);

	const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		const found = list.find((list) => {
			return String(list.id) === value;
		});

		setSelectedValue(found as DropdownItemProps);
		setIsOpen(false);
		if (onChangeCb && found) {
			onChangeCb(found);
		}
	};

	useOutside(dropdownRef, () => setIsOpen(false));

	useEffect(() => {
		setSelectedValue(list[0]);
	}, [list]);

	return (
		<DropdownWrapper ref={dropdownRef}>
			<DropdownButton onClick={handleListOpen}>
				{selectedValue?.name}
			</DropdownButton>

			<DropdownList isOpen={isOpen}>
				{list.map(({ id, name }) => {
					return (
						<DropdownListItem key={id}>
							<Checkbox
								id={unqiue + id}
								value={id}
								name={name}
								prefix={""}
								icon={""}
								label={""}
								onChange={handleSelect}
								checked={selectedValue?.id === id}
							/>
						</DropdownListItem>
					);
				})}
			</DropdownList>
		</DropdownWrapper>
	);
};

export default Dropdown;
