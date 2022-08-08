import axios from 'axios'
import { axiosCache } from './utils'
import Cookies from 'js-cookie'
import decode from 'jwt-decode'
let url = process.env.REACT_APP_BACKEND_URL
// if(process.env.NODE_ENV === 'production'){
    url = url + '/app'
// }
const API = axios.create({ baseURL: url })

const POST_REQUEST = 'POST'
const GET_REQUEST = 'GET'

API.interceptors.request.use((req: TODO) => {
	let accessToken = Cookies.get('voc-access')
	// let refreshToken = Cookies.get('myvpb-refresh')
	let userName = Cookies.get('crm-user')
	if (accessToken) {
		const decodeToken: any = decode(accessToken)
		const now = new Date().getTime()
		if (now > decodeToken.exp * 1000) {
			// get new access token by using refresh token
			// axios({
			// 	method: 'get',
			// 	url: `${process.env.REACT_APP_BACKEND_URL}/api/security/user/token/refresh?userName=${userName}&refreshToken=${refreshToken}`,
			// 	headers: {
			// 		Authorization: `Bearer ${accessToken}`,
			// 	},
			// })
			// 	.then(function (response) {
			// 		console.log('res below')
			// 		console.log(JSON.stringify(response.data))
			// 	})
			// 	.catch(function (error) {
			// 		console.log('err below')
			// 		console.log(error.response.data.message)
			// 	})
			// window.location.href = '/cms/login'
			localStorage.removeItem('voc-userName')
			localStorage.removeItem('voc-authorities')
		} 
		req.headers.Authorization = `${accessToken}`
	} else {
		// window.location.href = '/cms/login'
	}



	return req
})

export default API

/* START EVENT */

export const uploadEventImage = (data: TODO) => {
	return API({
		method: POST_REQUEST,
		url: '/api/events/image/upload',
		data,
	})
		.then(res => {
			return res
		})
		.catch(err => {
			return err
		})
}

// DELETE IMAGE
export const deleteEventImages = (data: TODO) => {
	return API({
		method: POST_REQUEST,
		url: '',
		data,
	})
		.then(res => {
			return res
		})
		.catch(err => {
			return err
		})
}

// save event	
export const saveEvent= (data: TODO) => {
	return API.post(`/api/events/save`, data)
}


// search event for manager
export const searchEventManager = (pageNumber: number, pageSize: number, q: string) => {
	return API.get(`/api/events/search?pageNumber=${pageNumber}&pageSize=${pageSize}${q}`)
}


//get event detail by id
export const getEventDetailById = (eventId: string) => {
	return API.get(`/api/events/detail/${eventId}`)
}

export const initEvent = () => {
	return API.post(`/api/events/init`)
}

export const deleteDraftEvent = (listEventId: number[]) => {
	return API.post(`/api/events/delete`, {listEventId})
}

export const searchEventInterest = (data: any) => {
	return API.get(`/api/events/interest/search?eventId=${data.eventId}`)
}

export const approveEvent = (listEventId: number[] | string[]) => {
	return API.post(`/api/events/approve`, {listEventId})
}

export const rejectEvent = (listEventId: number[] | string[], reason: string) => {
	return API.post(`/api/events/reject`, {listEventId, reason})
}

export const searchInterestEvent = (pageNumber: number, pageSize: number, q: string) => {
	return API.get(`/api/events/interest/search?pageNumber=${pageNumber}&pageSize=${pageSize}${q}`)
}


export const exportEventDetailToExcel = (eventId: string) => {
	return API({
		url: `/api/events/export/${eventId}/detail`, 
		method: GET_REQUEST,
		responseType: 'blob',
	}).then((response) => {
		const url = window.URL.createObjectURL(new Blob([response.data]))
		const link = document.createElement('a')
		link.href = url
		link.setAttribute('download', 'event-export-file.xls')
		document.body.appendChild(link)
		link.click()
	})
}

/* END EVENT */



