import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
	const [formData, setFormData] = useState({
		username: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmPassword: '',
		paymentMethod: '',
		address: '',
		profilePicture: null,
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const error = useSelector((state) => state.user.error);

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		if (name === 'profilePicture') {
			setFormData({ ...formData, [name]: files[0] });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(signupUser(formData)).then(() => {
			navigate('/login');
		});
	};

	return (
		<div className='signup-container'>
			<div className='signup-box'>
				<h2>Signup</h2>
				{error && <p className='error'>{error}</p>}
				<form onSubmit={handleSubmit}>
					<input type='text' name='username' placeholder='Username' value={formData.username} onChange={handleChange} />
					<input
						type='text'
						name='firstName'
						placeholder='First Name'
						value={formData.firstName}
						onChange={handleChange}
						required={true}
					/>
					<input
						type='text'
						name='lastName'
						placeholder='Last Name'
						value={formData.lastName}
						onChange={handleChange}
						required={true}
					/>
					<input
						type='password'
						name='password'
						placeholder='Password'
						value={formData.password}
						onChange={handleChange}
						required={true}
					/>
					<input
						type='password'
						name='confirmPassword'
						placeholder='Confirm Password'
						value={formData.confirmPassword}
						onChange={handleChange}
						required={true}
					/>
					<select name='paymentMethod' value={formData.paymentMethod} onChange={handleChange}>
						<option value=''>Select Payment Method</option>
						<option value='Credit Card'>Credit Card</option>
						<option value='Debit Card'>Debit Card</option>
						<option value='PayPal'>PayPal</option>
					</select>
					<input
						type='text'
						name='address'
						placeholder='Address'
						value={formData.address}
						onChange={handleChange}
						required={true}
					/>
					<input type='file' name='profilePicture' onChange={handleChange} />
					<button type='submit'>Signup</button>
				</form>
			</div>
		</div>
	);
};

export default Signup;
