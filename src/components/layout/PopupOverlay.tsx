import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export const PopupOverlay = () => {
	const navigate = useNavigate()

	return <Wrapper className='custom-popup-overlay' onClick={() => navigate(-1)}></Wrapper>
}

const Wrapper = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 900;
	opacity: 0.5;
`
