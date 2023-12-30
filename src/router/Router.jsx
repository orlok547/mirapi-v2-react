import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from '../components/Home'

function Router() {
	return (
		<>
		<BrowserRouter>
			<Routes>
				<Route index path="/" element={<Home />}></Route>
			</Routes>
		</BrowserRouter>
		</>
	)
}

export default Router