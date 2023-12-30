/**
 * Fetch characters.
 * @param {number} [page=1] - Current page number to fetch.
 * @param {boolean} [getAll=false] - If set to true ignores the fetch limit and get all characters.
*/

export async function getCharacters(page = 1, getAll = false) {
	let charList = [];
	let urlTarget = `https://webapi.mir4global.com/nft/lists?listType=sale&class=0&levMin=0&levMax=0&powerMin=0&powerMax=0&priceMin=0&priceMax=0&sort=latest&page=${page}&languageCode=en`;

	try {
		const res = await fetch(urlTarget);

		if (!res.ok) {
			console.error('fetch failed with status code ', res.status);
			return null;
		}

		const data = await res.json();
		/* console.log('data fetched!');
		console.log('data: ', data.data); */

		// return data.data.lists;
		charList = data.data.lists;

	} catch (error) {
		console.error('Error while fetching: ', error);
		return null;
	}

	return charList;
}