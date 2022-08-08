import axios from 'axios'

let url = process.env.REACT_APP_BACKEND_URL

// if(process.env.NODE_ENV === 'production'){
    url = url + '/app'
// }

export const login = (userName: string, password: string) => {
	return axios.post(
		`${url}/api/login?userName=${userName}&password=${password}`,
		{},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
}

// export const loginViaAzure = (accessToken: string) => {
// 	return API.post(`api/azure/login`, {accessToken})
// }
export const loginViaAzure = (accessToken: string) => {
	return axios.post(
		`${url}/api/azure/login`,
		{accessToken},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
}