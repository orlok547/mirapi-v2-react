import { Card } from 'react-bootstrap'
import { useGetCharacters } from '../hooks/useGetCharacters'

import './Home.css';

const Home = ()=>{
	const { charactersList } = useGetCharacters();

	console.log(`charactersList: `, charactersList);

	return (
		<>
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

export default Home