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
			// console.log(`charactersList in finally on retrigger/Home.jsx!!`);

			document.querySelector('#btn-fetch-more').classList.remove('disabled');
		});
	}

	const handleSetPage = ()=>{
		setPage(page + 1);

		// console.log(`page in handleSetPage on Home.jsx: `, page);
		
		retrigger(page);
	};

	const toggleGetAllAtOnce = ()=>{
		setGetAllAtOnce(!getAllAtOnce);

		// console.log(`getAllAtOnce in toggleGetAllAtOnce on Home.jsx: `, getAllAtOnce);
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
					<input type="checkbox" name="checkbox-get-all" id="checkbox-get-all" onClick={toggleGetAllAtOnce} />
					Fetch all
				</label>
				
				<div id="wrapper-cards">
					{charactersList.map((char, index)=>{
						// console.log(`char in charactersList.map on Home.jsx: `, char);
						console.log(`char.test in charactersList.map on Home.jsx: `, char.test);
						// if (!char.test) char.test = 'Hello test in charactersList.map on Home.jsx';

						return (
							<Card key={index} className='character-card'>
								<Card.Body>
									<Card.Title>
										<a href={`https://xdraco.com/nft/trade/${char.seq}`} target="_blank" rel="noopener noreferrer">
											{char.characterName}
										</a>
									</Card.Title>
									<Card.Text>
										ID: <strong>{char.transportID}</strong>
									</Card.Text>
									<Card.Text className='wrapper-price'>
										Price: <img src="/ico-wemix-credit-logo.webp" width="15" /> <strong>{char.price}</strong>
									</Card.Text>
									<Card.Text>
										Level: <strong>{char.lv}</strong>
									</Card.Text>
									<Card.Text>
										Power Score: <strong>{char.powerScore}</strong>
									</Card.Text>
									<Card.Text>
										Test: <strong>{char.test}</strong>
									</Card.Text>
									{/* {char.skills?.map((skill, ind)=>{
										console.log(`char.skills in char.skills.map on Home.jsx: `, char.skills);
										return (
											<>
												<Card.Text key={ind}>
													Skill Name: <strong>{skill.skillName}</strong>
												</Card.Text>
												<Card.Text>
													Skill Level: <strong>{skill.skillLevel}</strong>
												</Card.Text>
											</>
										)
									})} */}
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