import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";

export interface KimchiPeople {
	id: number;
	name: string;
	address: string;
}

export interface Musician {
	name: string;
	songs: number;
	musicianId: number;
}

export const getKimchies = async () => {
	const url = "http://localhost:3001/kimchiPeople";
	const { data, headers } = await axios.get<KimchiPeople[]>(url);

	return data;
};

export const useGetKimchies = () => {
	return useQuery(["kimchiPeople"], () => getKimchies());
};

export const getMusicians = async () => {
	const url = "http://localhost:3001/musician";
	const { data, headers } = await axios.get<Musician[]>(url);

	return data;
};

export const useGetMusicians = () => {
	return useQuery(["musicians"], () => getMusicians());
};
