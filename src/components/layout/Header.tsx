import {
	Avatar,
	Badge,
	Button,
	Dropdown,
	Input,
	Menu,
	Modal,
	Switch,
} from 'antd'
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import generateAvatarName from '../../utils/common/generate-avatar-name'
import {
	BellOutlined,
	SearchOutlined,
	MessageOutlined,
} from '@ant-design/icons'
import ChatRoom from '../ChatRoom'
import { LynkIdImg } from './LynkIdImg'
import { SignOutButton } from '../../modules/azureLogin/components/SignOutButton'

interface HeaderProps {
	presentTheme: string
	toggleTheme: () => void
}

const Header: React.FC<HeaderProps> = ({ presentTheme, toggleTheme }) => {
	// const [visible, setVisible] = useState(false)
	const navigate = useNavigate()

	return (
		<Wrapper>
			<div>
				<div style={{ marginRight: 10 }} className='logo-img'>
					<Link to='/' style={{ display: 'flex' }}>
						<LynkIdImg />
					</Link>
				</div>
			</div>
			<div className={'search-header'}>
				<Input
					size='large'
					prefix={<SearchOutlined />}
					placeholder='Nhập nội dung tìm kiếm'
					maxLength={300}
					onFocus={() => navigate('/search')}
				/>
			</div>
			<div>
				<Switch
					checkedChildren='Dark On'
					unCheckedChildren='Dark Off'
					checked={presentTheme === 'darkTheme'}
					onChange={toggleTheme}
				/>

				{/* <span style={{ marginLeft: 24 }}>
					<Link to='/notification'>
						<Badge count={5} size='small'>
							<Button shape='circle' icon={<BellOutlined />} />
						</Badge>
					</Link>
				</span> */}

				{/* <span style={{ marginLeft: 24 }}>
					<Badge count={2} size='small'>
						<Link to={'/chat'}>
							<Button
								shape='circle'
								icon={<MessageOutlined />}
								onClick={() => {
									setVisible(true)
								}}
							/>
						</Link>
					</Badge>
				</span> */}
				<Dropdown
					overlay={
						<Menu>
							<Menu.Item>
								<SignOutButton />
							</Menu.Item>
						</Menu>
					}
					placement='bottomRight'
				>
					<span className='profile' style={{ marginLeft: 24 }}>
						<span style={{ fontWeight: 500 }}>
							{localStorage.getItem('voc-userName')}
						</span>{' '}
						<Avatar
							style={{
								marginLeft: 3,
								background: '#40A9FF',
							}}
						>
							{generateAvatarName(
								localStorage.getItem('voc-userName') || ''
							)}
						</Avatar>
					</span>
				</Dropdown>
			</div>
			{/* <Modal
				footer={null}
				width={1000}
				visible={visible}
				onCancel={() => setVisible(false)}
			>
				<ChatRoom />
			</Modal> */}
		</Wrapper>
	)
}
export default Header

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	.search-header {
		width: 550px;
	}

	.profile:hover {
		text-decoration: underline;
		cursor: pointer;
	}

	@media (max-width: 1000px) {
		.search-header {
			width: unset;
		}
	}

	@media (max-width: 768px) {
		.search-header {
			display: none !important;
		}
	}
`
