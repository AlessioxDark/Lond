import { BrowserRouter, Route, Routes } from 'react-router';
import Explore from './Explore';
import Home from './Home';
import Sidebar from './Sidebar';
function App() {
	return (
		<div className=" w-full px-10 flex flex-row justify-center custom-scroll">
			<BrowserRouter>
				<Sidebar />
				<div className="p-20 flex flex-row justify-end pr-10 overflow-x-hidden w-full custom-scroll">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/explore" element={<Explore />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
