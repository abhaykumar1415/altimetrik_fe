import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDetails from './components/UserDetails';
import Home from './components/Home';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';
const App = () => {
	return (
		<Router>
			<ErrorBoundary>
				<div>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<Signup />} />
						<Route path='/userDetails' element={<UserDetails />} />
					</Routes>
				</div>
			</ErrorBoundary>
		</Router>
	);
};

export default App;
