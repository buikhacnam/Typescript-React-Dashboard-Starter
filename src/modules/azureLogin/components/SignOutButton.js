import { useMsal } from '@azure/msal-react'
import Cookies from 'js-cookie'

export const SignOutButton = () => {
	const { instance } = useMsal()

	const handleLogout = logoutType => {
		Cookies.remove('voc-access')
		Cookies.remove('voc-userId')
		Cookies.remove('voc-userName')
		localStorage.removeItem('voc-userName')
		localStorage.removeItem('voc-authorities')
		if (logoutType === 'popup') {
			instance.logoutPopup({
				// postLogoutRedirectUri: '/cms/login',
				mainWindowRedirectUri: '/cms/login',
			})
		} else if (logoutType === 'redirect') {
			instance.logoutRedirect({
				postLogoutRedirectUri: '/',
			})
		}
	}
	return <span onClick={() => handleLogout('popup')}>Sign out</span>
}
