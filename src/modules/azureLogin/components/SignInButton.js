import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../authConfig'
import { LockFilled } from '@ant-design/icons'
import {message} from 'antd'

export const SignInButton = () => {
	const { instance } = useMsal()

	const handleLogin = loginType => {
	
		if (loginType === 'popup') {
			instance.loginPopup(loginRequest).catch(e => {
				message.error(e)
			})
		} else if (loginType === 'redirect') {
			instance.loginRedirect(loginRequest).catch(e => {
				message.error(e)
			})
		}
	}
	return (
		<button onClick={() => handleLogin('redirect')}>
			<span className='lock'>
				<LockFilled />
			</span>{' '}
			Sign in
		</button>
	)
}
