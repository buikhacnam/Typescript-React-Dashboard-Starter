import React, { useState } from 'react'
import { Avatar, Layout } from 'antd'
import {
	FlagOutlined,
	RocketOutlined,
	BarChartOutlined,
	BookOutlined,
	ShopOutlined,
	CameraOutlined,
	FireOutlined,
	TeamOutlined,
	EnvironmentOutlined,
	UserOutlined,
	SnippetsOutlined
} from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import SubMenu from 'antd/lib/menu/SubMenu'
import styled from 'styled-components'
import useWindowSize from '../../utils/common/use-window-size'
import useMyRoute from '../../utils/common/ues-my-route'
import generateAvatarName from '../../utils/common/generate-avatar-name'
import { userRole } from '../../utils/common/userRole'
const {Menu}:any = require('antd')

const { Sider } = Layout
const { Item }:any = Menu

interface SiderProps {}

const keyMap: any = {
	'/event/manager': '/event/manager',
	'/event/feed': '/event/feed',
}

const SiderDashboard: React.FC<SiderProps> = () => {
	const [collapsed, setCollapsed] = useState(false)
	const { width } = useWindowSize()
	const { isPopUpRoute, pathname } = useMyRoute()
	const navigate = useNavigate()
	const redirect = ({ key }: any) => {
		navigate(key)
	}
	const onCollapse = (value: boolean) => {
		// console.log(value)
		setCollapsed(value)
	}
	console.log('USER ROLE', userRole)

	return (
		<div style={{ position: 'relative',}}>
			{/* {isPopUpRoute && <OverlayDiv />} */}

			<SiderStyled
				collapsible={!isPopUpRoute}
				onCollapse={onCollapse}
				collapsedWidth={45}
				width={255}
				// style={{ background: '#ffffff' }}
				collapsed={width < 768 ? true : collapsed}
				checkWidth={width}
			>
				{/* {!collapsed && width > 768 ? (
					<div style={{ margin: '20px 16px' }}>
						<Link to='/'>
							<img src='/img/lynkid.svg' alt='lynkid' />
						</Link>
					</div>
				) : (
					<div style={{ margin: '20px 8px' }}>
						<Link to='/'>
							<img src='/img/id-logo.svg' alt='lynkid' />
						</Link>
					</div>
				)} */}
				<MenuStyled
					onClick={redirect}
					selectedKeys={
						keyMap[pathname]
						// ? keyMap[pathname]
						// : '/articles/feed'
					}
					mode='inline'
					defaultOpenKeys={[
						'event',
					]}
				>
					<SubMenuStyled
						key='event'
						title='Sự Kiện'
						icon={<FlagOutlined />}
					>
						<Item key={keyMap['/event/feed']}>
							<span>Xem Sự Kiện</span>
						</Item>
						<Item key={keyMap['/event/manager']}>
							<span>Quản Lý Sự Kiện</span>
						</Item>
						
					</SubMenuStyled>

				</MenuStyled>
			</SiderStyled>
		</div>
	)
}

export default SiderDashboard

const OverlayDiv = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 1;
`

const SiderStyled = styled(Sider)<any>`
	height: calc(100vh - 0px);
	/* background: #ffffff; */
	overflow-y: auto !important;
	.ant-layout-sider-trigger {
		/* background: #ffffff; */
		color: #3b82f6;
		visibility: ${props => (props.checkWidth > 768 ? 'visible' : 'hidden')};
	}

	.ant-layout-sider-children {
		overflow-y: auto !important;

		&::-webkit-scrollbar {
			background-color: transparent;
			width: 10px;
		}
	}

	.ant-layout-sider-children:hover {
		&::-webkit-scrollbar {
			width: 10px;
		}
		&::-webkit-scrollbar-thumb {
			background-color: rgba(126, 119, 119, 0.2);
		}
	}
`

const MenuStyled = styled(Menu)<any>`
	/* height: calc(100vh - 0px); */
	margin-top: 64px;
	/* overflow-x: hidden; */
	.ant-menu-item::after {
		border-right: none;
	}

	.ant-menu-submenu-title {
		padding-left: 11px !important;
	}
	.ant-menu-submenu-selected {
		/* background: #3B82F6 !important; */
		/* color: #ffffff !important; */
	}

	[aria-expanded='true'] {
	}

	&.ant-menu-inline {
		padding-left: 8px !important;
		padding-right: 8px;
	}
	&.ant-layout-sider-has-trigger,
	&.ant-layout-sider-has-trigger {
		/* padding-bottom: 1000px !important; */
	}
	&.ant-menu-inline,
	&.ant-menu-vertical,
	&.ant-menu-vertical-left {
		border-right: none;
	}

	.ant-menu-sub.ant-menu-inline > .ant-menu-item {
		height: 30px !important;
	}

	&.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
		height: 35px !important;
	}
`

const SubMenuStyled = styled(SubMenu)`
	&.ant-menu-item {
		/* padding-left: 24px !important; */
	}

	.ant-menu-item-selected {
		/* background: #3b82f6 !important; */
		/* color: #ffffff; */
		border-right: none;
		&:hover {
			/* color: #ffffff; */
		}
		/* border-radius: 6px; */
	}

	.ant-menu-sub.ant-menu-inline {
		/* background: #ffffff; */
	}
`
const ItemStyled = styled(Item)`

	&.ant-menu-item {
		padding-left: 11px !important;
	}
`