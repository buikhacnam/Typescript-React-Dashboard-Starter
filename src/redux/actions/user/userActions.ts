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
			const { token, refresh_token, id} = responseData
			dispatch({
				type: UserActionTypes.LOGIN_USER_SUCCESS,
				payload: responseData,
			})
			localStorage.setItem('voc-userName', responseData.userName)
			if(responseData.authorities.length >0) {
				localStorage.setItem('voc-authorities', JSON.stringify(responseData.authorities.map((item:any) => item?.name)))
			}
			
			if (remember === 'on') {
				Cookies.set('voc-access', token, { expires: 7 })
				Cookies.set('voc-userId', id, { expires: 7 })
				Cookies.set('voc-userName', userName, { expires: 7 })
			} else {
				Cookies.set('voc-access', token)
				Cookies.set('voc-userId', refresh_token)
				Cookies.set('voc-userName', userName)
			}
			message.success('Đăng nhập thành công!')
			navigate('/articles/feed')
		} catch (err: any) {
			message.error(err?.response?.data?.message || err?.message || 'Something went wrong!')
			dispatch({ type: UserActionTypes.LOGIN_USER_FAILURE, payload: err?.response?.data?.message || err?.message || 'Something went wrong!' })
		}
		// dispatch({ type: UserActionTypes.LOGIN_CLEAR_ERROR })
	}
}
