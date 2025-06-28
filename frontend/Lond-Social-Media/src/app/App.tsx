import { BrowserRouter, Route, Routes } from 'react-router';
import Ex from '../components/Ex';
import LondiesProgressBar from '../components/Londies/utils/LondiesProgressBar';
import Explore from './Explore';
import Home from './Home';
import Londies from './Londies';
import Sidebar from './Sidebar';
function App() {
	return (
		<div className=" w-full px-10 flex flex-row justify-center custom-scroll">
			<BrowserRouter>
				<Sidebar />
				<div className="p-20 flex flex-row justify-end pr-10 overflow-x-hidden w-full overflow-hidden">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/explore" element={<Explore />} />
						<Route path="/londies" element={<Londies />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
