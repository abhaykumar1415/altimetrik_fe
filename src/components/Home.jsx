import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className='home-container'>
			<h1>Welcome to User Management Portal</h1>
			<p>
				Already a user? Please <Link to='/login'>Login</Link> to continue
			</p>
			<p>
				Please <Link to='/signup'>Sign Up</Link> to create an account
			</p>
		</div>
	);
};

export default Home;
