import { Result, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { scanTicket } from '../../../api/public'

export default function QrCodePage() {
	let query = useQuery()
	const [status, setStatus] = useState<any>('loading')
	const [title, setTitle] = useState('Đang kiểm tra')

	const userName = query.get('userName') || '--'
	const eventName = query.get('eventName') || '--'
	const email = query.get('email') || '--'
	const phone = query.get('phone') || '--'
	const token = query.get('token') || ''
	const ticketCode = query.get('ticketCode') || ''

	// console.log({
	// 	userName,
	// 	eventName,
	// 	email,
	// 	phone,
	// 	token,
	// 	ticketCode,
	// })

	useEffect(() => {
		checkQRCode()
	},[])

	const checkQRCode = async () => {
		try {
			await scanTicket(ticketCode, token)
			setStatus('success')
			setTitle('QR code hợp lệ!')

		} catch(err:any) {
			setStatus('error')
			setTitle(err?.response?.data?.message || 'Something went wrong!')
		}
	}

	return (
		<MobileView>
			{status !== 'loading' ? (
				<>
					<Result
						status={status}
						title={title}
						subTitle={status === 'success'? 'Thông tin sự kiện' : 'Vui lòng kiểm tra lại'}
					/>{' '}
					{status === 'success'? <>
					<p style={{}}><b>{eventName}</b></p>	
					<p>Họ tên: {userName}</p>
					<p>Số điện thoại: {phone}</p>
					<p>Email: {email}</p> </> : null}
				</>
			) : (
				<Spin className='xoay' tip='Đang kiểm tra mã QR' />
			)}
		</MobileView>
	)
}

function useQuery() {
	const { search } = useLocation()

	return React.useMemo(() => new URLSearchParams(search), [search])
}

const MobileView = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100vw;
	background-color: #fff;
	padding: 30px 20px;
	box-sizing: border-box;
	overflow: scroll;
	overflow-x: hidden;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
	-ms-overflow-style: -ms-autohiding-scrollbar;
	-webkit-overflow-scrolling: touch;
	&.xoay {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`
