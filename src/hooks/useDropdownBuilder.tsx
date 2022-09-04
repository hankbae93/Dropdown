interface DropProps<T> {
	id: string | number;
	name: string;
	value: T;
}

interface DropItemPropsCreator<T extends Record<string, any>> {
	createId: (key: keyof T) => this;
	createName: (key: keyof T) => this;
	build: () => DropProps<T>;
}

const useDropdownBuilder = () => {
	/**
	 * @function createId `Dropdown` 컴포넌트의 아이템 선택기준이 될 인자
	 * @function createName `Dropdown` 컴포넌트의 아이템 텍스트가 될 인자
	 * @function build `Dropdown` 컴포넌트의 아이템 텍스트가 될 인자
	 * @return `DropProps` `build`를 하면 `DropProps`타입 객체로 재구성한 객체 리턴
	 */
	const DropdownPropsBuilder = <T extends Record<string, any>>(obj: T) => {
		const props: DropProps<T> = {
			id: "",
			name: "",
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
			build: function () {
				if (!props.id || !props.name)
					throw new Error("id 또는 name이 존재하지 않습니다.");
				return props;
			},
		};
		return propsCreator;
	};

	return { DropdownPropsBuilder };
};

export default useDropdownBuilder;
