import { BrowserRouter, Route, Routes } from 'react-router-dom'

// import Nav from '../components/Nav'
import Home from '../components/Home'

function Router() {
	return (
		<>
		<BrowserRouter>
			{/* <Nav /> */}
			<Routes>
				<Route index path="/" element={<Home />}></Route>
			</Routes>
		</BrowserRouter>
		</>
	)
}

export default Router