import { BrowserRouter, Route, Routes } from 'react-router';
import LoginPage from '../components/Auth/pages/LoginPage';
import RegisterPage from '../components/Auth/pages/RegisterPage';
import Ex from '../components/Ex';
import LondiesProgressBar from '../components/Londies/utils/LondiesProgressBar';
import Explore from './Explore';
import Home from './Home';
import Londies from './Londies';
import Sidebar from './Sidebar';
import UserPage from './UserPage';
function App() {
	return (
		<div className=" w-full flex flex-row justify-center custom-scroll">
			<BrowserRouter>
				<div className="w-full h-full">
					{/* <Sidebar /> */}
					<Routes>
						<Route
							path="/"
							element={
								<div className="p-20 flex flex-row justify-end pr-10 overflow-x-hidden w-full overflow-hidden">
									<Sidebar />
									<Home />
									{/* <Ex /> */}
								</div>
							}
						/>
						<Route
							path="/explore"
							element={
								<div className="p-20 flex flex-row justify-end pr-10 overflow-x-hidden w-full overflow-hidden">
									<Sidebar />
									<Explore />
								</div>
							}
						/>
						<Route
							path="/londies"
							element={
								<div className="p-20 flex flex-row justify-end pr-10 overflow-x-hidden w-full overflow-hidden">
									<Sidebar />
									<Londies />
								</div>
							}
						/>
						<Route
							path="/profile"
							element={
								<div className="p-20 flex flex-row justify-end pr-10 overflow-x-hidden w-full overflow-hidden">
									<Sidebar />
									<UserPage />
								</div>
							}
						/>
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/login" element={<LoginPage />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
