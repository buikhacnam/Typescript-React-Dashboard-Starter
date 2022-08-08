import React from 'react'
import { Divider, Row } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { Link, useNavigate  } from 'react-router-dom'
interface PopupTitleProps {
    title: string
	backUrl: string
	style?: {[key: string]: any}
}

const PopupTitle: React.FC<PopupTitleProps> = ({title, backUrl, style}) => {
    const navigate = useNavigate()
	let url:any = backUrl
	if(!url) {
		url = -1
	}
    return <>
        <Row justify='space-between'>
				<p style={{fontSize: 16, fontWeight: 500}}>{title}</p>
				
					<CloseIcon onClick={() => navigate(url)}/>
			
			</Row>
			<Divider style={{ marginTop: 0, ...style }} />
    </>
}
export default PopupTitle

const CloseIcon = styled(CloseOutlined)`
	svg {
		border: 1px solid #9ca3af;
		color: #9ca3af;
		background: #ffffff;
		font-size: 1.2em;
		padding: 2px;
		&:hover {
			cursor: pointer;
			color: #40a9ff;
			border-color: #40a9ff;
		}
	}
	font-size: 1.2em;
`