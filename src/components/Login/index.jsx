import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const error = useSelector((state) => state.user.error);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(loginUser({ username, password })).then(() => {
			navigate('/userDetails');
		});
	};

	return (
		<div className='login-container'>
			<div className='login-box'>
				<h2>Login</h2>
				<p>Please enter your username and password!</p>
				{error && <p className='error'>{error}</p>}
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						required={true}
						placeholder='Username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						type='password'
						placeholder='Password'
						value={password}
						required={true}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<a href='/signup' className='forgot-password'>
						Create a new account ?
					</a>
					<button type='submit'>Login</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
