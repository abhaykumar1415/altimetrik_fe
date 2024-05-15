import api from '../../api/api';

export const loginUser = (credentials) => async (dispatch) => {
	try {
		const response = await api.post('/users/login', credentials);
		localStorage.setItem('token', response.data.token);
		dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
	} catch (error) {
		dispatch({ type: 'LOGIN_FAIL', payload: error.response.data });
	}
};

export const signupUser = (userData) => async (dispatch) => {
	try {
		const response = await api.post('/users/signup', userData);
		dispatch({ type: 'SIGNUP_SUCCESS', payload: response.data });
	} catch (error) {
		dispatch({ type: 'SIGNUP_FAIL', payload: error.response.data });
	}
};

export const fetchUsers = () => async (dispatch) => {
	try {
		const response = await api.get('/users');
		dispatch({ type: 'FETCH_USERS_SUCCESS', payload: response.data });
	} catch (error) {
		dispatch({ type: 'FETCH_USERS_FAIL', payload: error.response.data });
	}
};

export const updateUser = (id, userData) => async (dispatch) => {
	try {
		const response = await api.put(`/users/${id}`, userData);
		dispatch({ type: 'UPDATE_USER_SUCCESS', payload: response.data });
		dispatch(fetchUsers());
	} catch (error) {
		dispatch({ type: 'UPDATE_USER_FAIL', payload: error.response.data });
	}
};
