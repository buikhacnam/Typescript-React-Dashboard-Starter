import axios from 'axios'
import { axiosCache } from './utils'
import Cookies from 'js-cookie'
import decode from 'jwt-decode'
const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL })

API.interceptors.request.use((req: TODO) => {
	let accessToken = Cookies.get('crm-access')
	let refreshToken = Cookies.get('crm-refresh')
	let userName = Cookies.get('crm-user')
	if (accessToken) {
		const decodeToken: any = decode(accessToken)
		const now = new Date().getTime()
		if (now > decodeToken.exp * 1000) {
			// get new access token by using refresh token
			axios({
				method: 'get',
				url: `${process.env.REACT_APP_BACKEND_URL}/api/security/user/token/refresh?userName=${userName}&refreshToken=${refreshToken}`,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
				.then(function (response) {
					console.log('res below')
					console.log(JSON.stringify(response.data))
				})
				.catch(function (error) {
					console.log('err below')
					console.log(error.response.data.message)
				})
			// window.location.href = '/login'
			localStorage.removeItem('userName')
			localStorage.removeItem('userRole')
		}
		req.headers.Authorization = `Bearer ${accessToken}`
	}

	return req
})

export default API

export const fetchOccupation = () => {
	return axiosCache(`/api/metadata/profile/occupations`, 0.01)
}


export const createWorkingLead = (data: any, update=false) => {
	if(update) {
		return API.put('/api/customer/leads/workingActivity', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}
	return API.post('/api/customer/leads/workingActivity', data, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
}


export const getMeetupLeadList = (
	startDate: string,
	endDate: string,
	leadId?: string
) => {
	let id = leadId ? leadId : ''
	const startDate1 = '2022-01-01'
	const endDate1 = '2022-01-30'
	const encodeHours = encodeURIComponent('00:00:00.000')
	// return Scheduledata
	return API.get(
		`/api/customer/leads/scheduleList?leadId=${id}&startDate=${startDate}+${encodeHours}&endDate=${endDate}+${encodeHours}`
	)
}


export const createNoteLeadList = (leadId: string, content: string) => {
	return API.post(
		`/api/customer/leads/note`,
		{ leadId, content },
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
}

export const deleteNoteLead = (id: number) => {
	return API.delete(`/api/customer/leads/note/delete/${id}`)
}

export const updateNoteLeadList = (
	id: number,
	leadId: string,
	content: string
) => {
	return API.post(
		`/api/customer/leads/note`,
		{ id, leadId, content },
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
}


//DOWNLOAD EXCEL FILE
export const downloadInportFile = () => {
	return API({
		url: '/api/customer/download/template?fileName=IMPORT_LEAD_TEMPLATE.xlsx&type=xlsx', 
		method: 'GET',
		responseType: 'blob',
	}).then((response) => {
		const url = window.URL.createObjectURL(new Blob([response.data]))
		const link = document.createElement('a')
		link.href = url
		link.setAttribute('download', 'lead-import-template.xls')
		document.body.appendChild(link)
		link.click()
	})
	
}

//UPLOAD FILE
export const uploadLeadFile = (data: TODO) => {
	console.log('data111111111111111', data)
	return API({
		method: 'post',
		url: '/api/customer/leads/upload-file',
		data,
	})
		.then(res => {
			return res
		})
		.catch(err => {
			return err
		})
}


export const checkDuplicateLeadFile = (
	batchId: number,
	duplicateType?: string,
	importLimit?: string
) => {
	if (!duplicateType) duplicateType = 'all'
	if (!importLimit) importLimit = 'all'
	return API.post(
		`/api/customer/leads/upload-file/validate/duplicate/${batchId}?duplicateType=${duplicateType}&importLimit=${importLimit}`,
		{}
	)
}


export const postAssignmentRule = (data: TODO) => {
	return API.post(`/api/customer/admin/assign-leads/rule`, data, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const fetchSearchLeadList = (
	current: number,
	pageSize: number,
	query: string,
	sort: string
) => {
	return API.get(
		`/api/aggregation/admin/assign-leads/leads/search?pageNumber=${current}&pageSize=${pageSize}${query}${sort}`
	)
} // orderType=asc desc   orderBy=full_name, email, phone, created_at



