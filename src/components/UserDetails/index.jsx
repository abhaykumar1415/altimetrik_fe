import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser } from '../../redux/actions/userActions';
import './UserDetails.css';

const UserDetails = () => {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.user.users);
	const editUserId = useSelector((state) => state.user.editUserId);
	const token = useSelector((state) => state.user.token);
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(3);
	const [editableUser, setEditableUser] = useState(null);

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	useEffect(() => {
		if (editUserId) {
			const user = users.find((user) => user.id === editUserId);
			setEditableUser(user);
		} else {
			setEditableUser(null);
		}
	}, [editUserId, users]);

	useEffect(() => {
		const storedEditUserId = localStorage.getItem('editUserId');
		if (storedEditUserId) {
			dispatch({ type: 'SET_EDIT_USER_ID', payload: storedEditUserId });
		}
	}, [dispatch]);

	useEffect(() => {
		if (editUserId) {
			localStorage.setItem('editUserId', editUserId);
		} else {
			localStorage.removeItem('editUserId');
		}
	}, [editUserId]);

	const handleEdit = (user) => {
		dispatch({ type: 'SET_EDIT_USER_ID', payload: user.id });
	};

	const handleSave = () => {
		if (editableUser) {
			dispatch(updateUser(editUserId, editableUser));
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditableUser((prev) => ({ ...prev, [name]: value }));
	};

	const paginatedUsers = users.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

	return (
		<div className='user-details-container'>
			<h2>User Details</h2>
			<table>
				<thead>
					<tr>
						<th>Username</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Address</th>
						<th>Profile Picture</th>
						<th>Edit</th>
					</tr>
				</thead>
				<tbody>
					{paginatedUsers.map((user) => (
						<tr key={user.id}>
							<td>{user.username}</td>
							<td>
								{editUserId === user.id
									? editableUser && (
											<input type='text' name='firstName' value={editableUser.firstName} onChange={handleChange} />
									  )
									: user.firstName}
							</td>
							<td>
								{editUserId === user.id
									? editableUser && (
											<input type='text' name='lastName' value={editableUser.lastName} onChange={handleChange} />
									  )
									: user.lastName}
							</td>
							<td>
								{editUserId === user.id
									? editableUser && (
											<input type='text' name='address' value={editableUser.address} onChange={handleChange} />
									  )
									: user.address}
							</td>
							<td>
								<img src={user.profilePicture} alt='Profile' width='50' height='50' />
							</td>
							<td>
								{editUserId === user.id ? (
									<button onClick={handleSave}>Save</button>
								) : (
									<button onClick={() => handleEdit(user)}>Edit</button>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className='pagination'>
				<button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
					Previous
				</button>
				<span>
					Page {currentPage} of {Math.ceil(users.length / rowsPerPage)}
				</span>
				<button
					onClick={() => setCurrentPage((prev) => (prev < Math.ceil(users.length / rowsPerPage) ? prev + 1 : prev))}
					disabled={currentPage === Math.ceil(users.length / rowsPerPage)}
				>
					Next
				</button>
				<select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
					<option value={3}>3</option>
					<option value={5}>5</option>
					<option value={10}>10</option>
				</select>
			</div>
		</div>
	);
};

export default UserDetails;
