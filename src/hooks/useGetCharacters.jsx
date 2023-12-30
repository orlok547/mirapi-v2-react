import { useState, useEffect } from "react";
import { getCharacters } from "../services/getCharacters";

export const useGetCharacters = (page)=>{
	const [charactersList, setCharactersList] = useState([]);

	useEffect(()=>{
		getCharacters(page, true)
			.then((res)=>{
				setCharactersList(res);
			})
			.catch((error)=>{
				console.error(error);
			})
		;
	}, [])

	return { charactersList };
}