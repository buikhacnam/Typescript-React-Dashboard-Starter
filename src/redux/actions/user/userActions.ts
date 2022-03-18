import axios from 'axios'
import { Dispatch } from 'redux'
import { UserActionTypes } from '../../constants/user/userConstants'
import Cookies from 'js-cookie'
import { message } from 'antd'
import {NavigateFunction} from "react-router-dom"
import { login } from '../../../api/auth/login'

export const loginUser = (user: {userName: string, password: string, remember: string}, navigate: NavigateFunction) => {
	return async function (dispatch: Dispatch) {
		const { userName, password, remember } = user
		try {
			dispatch({ type: UserActionTypes.LOGIN_USER_REQUEST })
			const response = await login(userName, password)
			const { responseData } = response?.data
			const { access_token, refresh_token, } = responseData
			dispatch({
				type: UserActionTypes.LOGIN_USER_SUCCESS,
				payload: responseData,
			})
			localStorage.setItem('userName', responseData.userName)
			localStorage.setItem('userRole', responseData.userRole)

			console.log('data', response)
			if (remember === 'on') {
				Cookies.set('crm-access', access_token, { expires: 7 })
				Cookies.set('crm-refresh', refresh_token, { expires: 7 })
				Cookies.set('crm-user', userName, { expires: 7 })
			} else {
				Cookies.set('crm-access', access_token)
				Cookies.set('crm-refresh', refresh_token)
				Cookies.set('crm-user', userName)
			}
			message.success('Đăng nhập thành công!')
			navigate('/')
		} catch (err: any) {
			console.log('err', err.message)
			message.error(err?.response?.data?.message || err?.message || 'Something went wrong!')
			dispatch({ type: UserActionTypes.LOGIN_USER_FAILURE, payload: err?.response?.data?.message || err?.message || 'Something went wrong!' })
		}
		// dispatch({ type: UserActionTypes.LOGIN_CLEAR_ERROR })
	}
}
