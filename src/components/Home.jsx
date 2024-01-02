import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap'
// import { useGetCharacters } from '../hooks/useGetCharacters'
import { getCharacters } from '../services/getCharacters';

import './Home.css';

const Home = ()=>{
	const [ page, setPage ] = useState(1);
	const [ getAllAtOnce, setGetAllAtOnce ] = useState(false);
	const [ charactersList, setCharactersList ] = useState([]);

	useEffect(()=>{
		// console.log(`%c useEffect on Home.jsx!`, 'font-weight:bold; color:lightblue;');

		getCharacters(page, false)
		.then((res)=>{
			setCharactersList(res);
			setPage(page + 1);
		})
		.catch((error)=>{
			console.error(error);
		});
	}, [])

	// console.log(`charactersList on Home.jsx: `, charactersList);

	const retrigger = (pageToFetch)=>{
		// console.log(`pageToFetch in resRetrigger on Home.jsx: `, pageToFetch);

		let resRetrigger;
		
		document.querySelector('#btn-fetch-more').classList.add('disabled');

		getCharacters(pageToFetch, getAllAtOnce)
		.then((res)=>{
			resRetrigger = res;
			// console.log(`resRetrigger on Home.jsx: `, resRetrigger);

			setCharactersList(prevCharsList => prevCharsList.concat(resRetrigger));
		})
		.catch((error)=>{
			console.error(error);
		})
		.finally(()=>{
			console.log(`charactersList in finally on useEffect/Home.jsx!!`);
			document.querySelector('#btn-fetch-more').classList.remove('disabled');
		});
	}

	const handleSetPage = ()=>{
		setPage(page + 1);

		// console.log(`page in handleSetPage on Home.jsx: `, page);
		
		retrigger(page);
	};

	const triggerGetAllAtOnce = ()=>{
		setGetAllAtOnce(!getAllAtOnce);

		// console.log(`getAllAtOnce in triggerGetAllAtOnce on Home.jsx: `, getAllAtOnce);
	};

	if (!charactersList || charactersList.length === 0) {
		return (
			<>
				<Button id='btn-fetch-more' variant="dark" onClick={handleSetPage}>Fetch more</Button>
				<p>Loading results. / No results found.</p>
			</>
		)
	} else {
		return (
			<>
				<Button id='btn-fetch-more' variant="dark" onClick={handleSetPage}>Fetch more</Button>
				
				<label htmlFor="checkbox-get-all">
					<input type="checkbox" name="checkbox-get-all" id="checkbox-get-all" onClick={triggerGetAllAtOnce} />
					Fetch all
				</label>
				
				<div id="wrapper-cards">
					{charactersList.map((char, index)=>{
						return (
							<Card key={index} className='character-card'>
								<Card.Body>
									<Card.Title>{char.characterName}</Card.Title>
									<Card.Text>
										ID: {char.transportID}
									</Card.Text>
									<Card.Text>
										Price: {char.price}
									</Card.Text>
								</Card.Body>
							</Card>
						)
					})}
				</div>
			</>
		)
	}
}

export default Home