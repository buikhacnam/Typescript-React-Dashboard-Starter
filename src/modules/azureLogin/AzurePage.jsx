import React, { useState, useEffect } from 'react'
import {
	AuthenticatedTemplate,
	UnauthenticatedTemplate,
} from '@azure/msal-react'
import styled from 'styled-components'
import { PageLayout } from './components/PageLayout'

import useAccessToken from './components/getAccessToken'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Spin } from 'antd'

import Cookies from 'js-cookie'
import { loginViaAzure } from '../../api/auth/login'

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */

message.config({
	maxCount: 1,
})

let token = null

const ProfileContent = () => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	const accessToken = useAccessToken()

	console.log({ accessToken })

	useEffect(() => {
		if (accessToken && !token) {
			token = accessToken
			login(accessToken)
		}
	}, [accessToken])

	const login = async accessToken => {
		setLoading(true)
		try {
			// console.log('LOGIN: ', token)
			const response = await loginViaAzure(accessToken)
			const { responseData } = response?.data
			const { token, refresh_token, userName } = responseData
			localStorage.setItem('voc-userName', responseData.userName)
			if (responseData.authorities.length > 0) {
				localStorage.setItem(
					'voc-authorities',
					JSON.stringify(
						responseData.authorities.map(item => item?.name)
					)
				)
			}

			Cookies.set('voc-access', token)
			Cookies.set('voc-userId', refresh_token)
			Cookies.set('voc-userName', userName)
			message.success('Đăng nhập thành công!')
			navigate('/event/feed')
		} catch (err) {
			message.error(err?.response?.data?.message || 'Login Failed!')
		}
		setLoading(false)
	}

	return (
		<>
			{loading && (
				<LoadingOverlay>
					<Spin
						className='xoay'
						size='large'
						tip='Logging in to MyVPBank...'
					/>
				</LoadingOverlay>
			)}
		</>
	)
}

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {
	return (
		<div className='App'>
			<AuthenticatedTemplate>
				<ProfileContent />
			</AuthenticatedTemplate>

			<UnauthenticatedTemplate></UnauthenticatedTemplate>
		</div>
	)
}

export default function AzurePage() {
	return (
		<PageLayout>
			<MainContent />
		</PageLayout>
	)
}

const LoadingOverlay = styled.div`
	background-color: rgba(0, 0, 0, 0.6);
	z-index: 100;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	.xoay {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`
