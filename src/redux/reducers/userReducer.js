const initialState = {
	users: [],
	loading: false,
	error: null,
	token: null,
	editUserId: null,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			return { ...state, token: action.payload.token, error: null };
		case 'LOGIN_FAIL':
			return { ...state, error: action.payload.message };
		case 'SIGNUP_SUCCESS':
			return { ...state, error: null };
		case 'SIGNUP_FAIL':
			return { ...state, error: action.payload.message };
		case 'FETCH_USERS_SUCCESS':
			return { ...state, users: action.payload, error: null };
		case 'FETCH_USERS_FAIL':
			return { ...state, error: action.payload.message };
		case 'UPDATE_USER_SUCCESS':
			return { ...state, error: null, editUserId: null };
		case 'UPDATE_USER_FAIL':
			return { ...state, error: action.payload.message };
		case 'SET_EDIT_USER_ID':
			return { ...state, editUserId: action.payload };
		default:
			return state;
	}
};

export default userReducer;
