/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import styled from 'styled-components'

import { useIsAuthenticated } from '@azure/msal-react'
import { SignInButton } from './SignInButton'
import { LynkIdImg } from '../../../components/layout/LynkIdImg'

/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props
 */
export const PageLayout = props => {
	const isAuthenticated = useIsAuthenticated()
	return (
		<div style={{ background: '#F9FAFB', height: '100vh' }}>
			<Wrapper>
				<Container>
					<div style={{ textAlign: 'center' }}>
						<LynkIdImg />
						{!isAuthenticated ? (
							<h2 style={{ fontWeight: '800 !important' }}>
								Sign in to My VPBank
							</h2>
						) : null}
					</div>

					<div style={{ marginTop: '1.5rem' }}>
						{isAuthenticated ? null : <SignInButton />}
					</div>
				</Container>
				{props.children}
			</Wrapper>
		</div>
	)
}



const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100%;

	button {
		position: relative;
		font-weight: 500;
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: #fff;
		padding: 0.5rem 1rem;
		background: rgb(79 70 229);
		border: 1px solid transparent;
		border-radius: 0.375rem;
		cursor: pointer;
		display: flex;
		justify-content: center;
		width: 100%;
		align-content: stretch;
	}

	button:hover {
		background: #4338ca;
	}

	.lock {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		padding-left: 0.75rem;
		padding-top: 0.5rem;
		font-size: 1.2rem;
		width: 2.5rem;
		height: 2.5rem;
		color: rgb(99 102 241);
	}
`
const Container = styled.div`
	max-width: 28rem;
	width: 100%;
`
