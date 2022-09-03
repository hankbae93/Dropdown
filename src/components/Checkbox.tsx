import React from "react";
import { CheckboxLabelPrefix, CheckboxWrapper } from "./Checkbox.style";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	prefix: string;
	icon: string;
	label: string;
}

const Checkbox = ({
	id,
	name,
	value,
	checked,
	disabled,
	onChange,
	prefix,
	icon,
	label,
}: Props) => {
	return (
		<CheckboxWrapper onClick={(e) => e.stopPropagation()}>
			<label htmlFor={id}>
				{name}
				<input
					type='radio'
					id={id}
					name={name}
					value={value}
					checked={checked}
					disabled={disabled}
					onChange={onChange}
				/>
			</label>
		</CheckboxWrapper>
	);
};

export default Checkbox;
