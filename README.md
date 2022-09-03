# 이슈사항

1. api에서 받은 데이터를 `Dropdown` Props에 맞춰 가공하고 싶음

2. 가공한 데이터지만 여전히 원본이 유지되어있고 싶음

3. 가공하는 과정이 매번 새로운 배열에 직접 쓰는 방식이 아닌 `명시적`이었으면 좋겠음

# Dropdown의 형태

```ts
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
```

# case 1

Builder 패턴으로 시도

- api마다 id는 그저 인덱스인 상황이고 고유한 제품번호나 토큰이 있을 때 명시적으로 선택할 수 있음

- `value`에는 원본을 담음

```ts
type BuilderFunction = <T extends Record<string, any>>(
	obj: T,
	key: keyof T | "value"
) => object;

const useDropdownBuilder = () => {
	const createId: BuilderFunction = (obj, key) => {
		return { id: obj[key] };
	};

	const createName: BuilderFunction = (obj, key) => {
		return { name: obj[key] };
	};

	const createValue: BuilderFunction = (obj, key) => {
		return { value: obj };
	};

	return { createId, createName, createValue };
};

export default useDropdownBuilder;
```

```ts
const Page = () => {
	const { createId, createName, createValue } = useDropdownBuilder();
	const { data: kimchiPeopleList } = useGetKimchies();

	const kimchiList = useMemo(
		() =>
			kimchiPeopleList?.map((kimchi) => {
				return {
					...createId(kimchi, "id"),
					...createName(kimchi, "name"),
					...createValue(kimchi, "value"),
				} as DropdownItemProps;
			}) ?? [],
		[kimchiPeopleList]
	);

	return (
		<div>
			<Dropdown list={kimchiList} unqiue='kimchi' />
		</div>
	);
};

export default Page;
```

# case 1 - 1

builder 패턴 + 제네릭 추가

- 사용자가 인풋을 입력할 때 데이터의 `key`타입으로 자동완성되게 작업

```ts
const Page = () => {
	const { createDropdownlist } = useDropdownBuilder();
	const { data: kimchiPeopleList } = useGetKimchies();

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
```

```ts
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
```
