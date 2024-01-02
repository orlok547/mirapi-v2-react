/**
 * Fetch characters.
 * @param {number} [page=1] - Current page number to fetch.
 * @param {boolean} [getAll=false] - If set to true ignores the fetch limit and get all characters.
*/

export async function getCharacters(page = 1, getAll = false) {
	let charList = [];

	const fetchData = async ()=>{
		let urlTarget = `https://webapi.mir4global.com/nft/lists?listType=sale&class=0&levMin=0&levMax=0&powerMin=0&powerMax=0&priceMin=0&priceMax=0&sort=latest&page=${page}&languageCode=en`;
		
		// console.log('page on getCharacters.js: ', page);

		try {
			const res = await fetch(urlTarget);
	
			if (!res.ok) {
				console.error('fetch failed with status code ', res.status);
				return null;
			}
	
			const data = await res.json();
			/* console.log('data fetched!');
			console.log('data: ', data.data); */

			// console.log('page: ', page);
	
			return data.data.lists;
			// charList = data.data.lists;	
		} catch (error) {
			console.error('Error while fetching: ', error);
			return null;
		}
	};

	if (getAll) {
		do {
			const result = await fetchData();

			// console.log('result on doWhile getCharacters.js: ', result);
			
			if (result != null && result.length > 0) {
				charList = charList.concat(result);
			} else {
				console.log(`Page doesn't exits.`);
				break;
			}

			page++;
		} while (getAll);
	} else {
		const result = await fetchData();
		
		// console.log('result on getCharacters.js: ', result);

		if (result != null && result.length > 0) {
			charList = charList.concat(result);
		} else {
			console.log(`Page doesn't exits.`);
		}

	}

	// console.log('getCharacters.js ended!');
	return charList;
}