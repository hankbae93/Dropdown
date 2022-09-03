interface DropProps<T> {
	id: any;
	name: any;
	value: T;
}
interface DropItemPropsCreator<T extends Record<string, any>> {
	createId: (key: keyof T) => this;
	createName: (key: keyof T) => this;
	build: () => DropProps<T>;
}

const useDropdownBuilder = () => {
	/**
	 * @param id `Dropdown` 컴포넌트의 아이템 선택기준이 될 인자
	 * @param name `Dropdown` 컴포넌트의 아이템 텍스트가 될 인자
	 * @return DropProps `build`를 하면 `DropProps`타입 객체로 재구성한 배열 리턴
	 */
	const createDropdownlist = <T extends Record<string, any>>(obj: T) => {
		const props: DropProps<T> = {
			id: null,
			name: null,
			value: obj,
		};

		const propsCreator: DropItemPropsCreator<T> = {
			createId: function (key: keyof T) {
				props.id = obj[key];
				return this;
			},
			createName: function (key: keyof T) {
				props.name = obj[key];
				return this;
			},
			build: () => props,
		};
		return propsCreator;
	};

	return { createDropdownlist };
};

export default useDropdownBuilder;
