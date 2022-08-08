import decode from 'jwt-decode'
import Cookies from 'js-cookie'

const checkAuth = () => {

	return true


	// if(process.env.NODE_ENV !== 'production') return true

	// const token = Cookies.get('voc-access')
	// // const refreshToken = Cookies.get('myvpb-refresh')
	// const userName = Cookies.get('voc-userName')
	// if (!token) {
	// 	return false
	// }
	// try {
	// 	const decodeToken: any = decode(token)
	// 	// const refreshDecodeToken: any = decode(refreshToken)
	// 	const now = new Date().getTime()

	// 	// if (now > refreshDecodeToken.exp * 1000) {
	// 	// 	return false
	// 	// }
	// 	// refresh token api doesnt work, use this for now
	// 	if (now > decodeToken.exp * 1000) {
	// 		localStorage.removeItem('voc-userName')
	// 		localStorage.removeItem('voc-authorities')
	// 		// axios({
	// 		// 	method: 'get',
	// 		// 	url:
	// 		// 		`${process.env.REACT_APP_BACKEND_URL}/api/security/user/token/refresh?userName=${userName}&refreshToken=${refreshToken}`,
	// 		// 	headers: {
	// 		// 		Authorization:
	// 		// 			`Bearer ${token}`,
	// 		// 	},
	// 		// })
	// 		// 	.then(function (response) {
	// 		// 		console.log('res below')
	// 		// 		console.log(JSON.stringify(response.data))
	// 		// 	})
	// 		// 	.catch(function (error) {
	// 		// 		console.log('err below')
	// 		// 		console.log(error.response.data.message)
	// 		// 	})
	// 		return false
	// 	}

	// 	return true
	// } catch (e) {
	// 	return false
	// }
}
export default checkAuth
