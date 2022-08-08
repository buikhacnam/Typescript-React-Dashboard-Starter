import { UserActionTypes } from '../../constants/user/userConstants'

const initialState = {
	userInfo: {},
	loading: false,
	error: false,
	errorMessage: '',
}

export const userProfileReducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case UserActionTypes.LOGIN_USER_REQUEST:
			return {
				...state,
				loading: true,
			}
		case UserActionTypes.LOGIN_USER_SUCCESS:
			return {
				...state,
				loading: false,
				userInfo: action.payload,
			}
		case UserActionTypes.LOGIN_USER_FAILURE:
			return {
				...state,
				loading: false,
				error: true,
				errorMessage: action.payload,
			}
		case UserActionTypes.LOGOUT_USER:
			return state
		case UserActionTypes.LOGIN_CLEAR_ERROR:
			return {
				...state,
				error: false,
				loading: false,
				errorMessage: '',
			}
		default:
			return state
	}
}
