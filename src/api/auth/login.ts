import axios from 'axios'

export const login = (userName: string, password: string) => {
	return axios.post(
		`${process.env.REACT_APP_BACKEND_URL}/api/security/public/login?userName=${userName}&password=${password}`,
		{},
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
}
