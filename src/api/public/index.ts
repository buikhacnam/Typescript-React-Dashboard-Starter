import axios from 'axios'

let url = process.env.REACT_APP_BACKEND_URL

// if(process.env.NODE_ENV === 'production'){
    url = url + '/app'
// }

export const scanTicket = (ticketCode: string, token: string) => {
	return axios.post(
		`${url}/api/events/interest/scan-ticket?ticketCode=${ticketCode}`,
		{},
		{
			headers: {
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
			},
		}
	)
}
