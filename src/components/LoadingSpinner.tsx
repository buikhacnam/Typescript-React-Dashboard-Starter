import React from 'react'
import { Spin } from 'antd'
import styled from 'styled-components'
import { LoadingOutlined } from '@ant-design/icons';
interface LoadingSpinnerProps {}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = () => {
	return (
		<SpinWrapper>
			<Spin />
		</SpinWrapper>
	)
}

export const CustomSpin = () => {
	return (
		<SpinWrapper2>
			<Spin />
		</SpinWrapper2>
	)
}

const SpinWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`

const SpinWrapper2 = styled.div`
	text-align: center;
	margin: 50px 0;
`

export const SpinOverlay = () => {
	return (
		<LoadingOverlay>
			<Spin className='xoay'/>
		</LoadingOverlay>
	)
}

export const SimpleSpin = () => {
	const antIcon = <LoadingOutlined style={{ fontSize: 10 }} spin />
	return <Spin indicator={antIcon} />
}

export const CenterSpin = ({style} : {[key: string]: any}) => {
	return <CenterSpinStyle style={{...style}}>
		<Spin />
	</CenterSpinStyle>
}

const LoadingOverlay = styled.div`
	z-index: 100;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 80vh;
	.xoay {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`

const CenterSpinStyle = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`

export default LoadingSpinner
