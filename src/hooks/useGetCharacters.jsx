import { useState, useEffect } from "react";
import { getCharacters } from "../services/getCharacters";

export const useGetCharacters = (page, getAll)=>{
	const [charactersList, setCharactersList] = useState([]);

	useEffect(()=>{
		getCharacters(page, getAll)
			.then((res)=>{
				console.log(`res on useGetCharacters.jsx: `, res);

				setCharactersList(res);
			})
			.catch((error)=>{
				console.error(error);
			})
		;
	}, [])

	// console.log('useGetCharacters.jsx ended!');
	return { charactersList };
}