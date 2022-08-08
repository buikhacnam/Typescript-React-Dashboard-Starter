import { Children } from 'react'
import styled from 'styled-components'



export const Popupwrapper =({ children }: { children: React.ReactNode }) => {
	return <Container className='custom-popup-container'>{children}</Container>
}

export const Container = styled.div`
	position: fixed;
	left: 20%;
	right: 0%;
	top: 0;
	bottom: 0;
	padding: 24px;
	z-index: 999;
	overFlow-y: auto;
`
