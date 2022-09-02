import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface KimchiPeople {
	id: number;
	name: string;
	address: string;
}

export const getKimchies = async (): Promise<KimchiPeople[]> => {
	const url = "http://localhost:3001/kimchiPeople";
	const { data, headers } = await axios.get(url);

	return data.data;
};

export const useGetKimchies = () => {
	return useQuery(["kimchiPeople"], () => getKimchies());
};
