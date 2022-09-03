import styled from "styled-components";

export const DropdownWrapper = styled.div`
	position: relative;
	min-width: 300px;
`;

export const DropdownButton = styled.button`
	width: 100%;
	height: 44px;
	background-color: red;
	color: #fff;
`;

export const DropdownList = styled.ul<{ isOpen: boolean }>`
	${({ isOpen }) => !isOpen && `display:none;`}
	position: absolute;
	left: 0;
	top: 50px;
	width: 100%;
	padding: 0;
	margin: 0;
	background-color: #2b2b2b2b;
`;

export const DropdownListItem = styled.li`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 4px 10px;
	box-sizing: border-box;
`;
