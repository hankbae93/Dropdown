interface DropProps<T> {
	id: string | number;
	name: string;
	value: T;
}

/**
 * @param data `Dropdown` 컴포넌트에 변환되어 들어갈 리스트
 * @param keyId `Dropdown` 컴포넌트의 아이템 선택기준이 될 인자
 * @param keyName `Dropdown` 컴포넌트의 아이템 텍스트가 될 인자
 * @return `DropProps`타입 객체로 재구성한 객체 배열 리턴
 */
export default function convertToDropdownList<T extends Record<string, any>>(
	data: T[],
	keyId: keyof T,
	keyName: keyof T
): DropProps<T>[] {
	return data.map((obj) => {
		return {
			id: obj[keyId],
			name: obj[keyName],
			value: obj,
		};
	});
}
