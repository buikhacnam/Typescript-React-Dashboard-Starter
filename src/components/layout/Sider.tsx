import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
	RiseOutlined,
	HomeOutlined,
	FlagOutlined,
	TeamOutlined,
	SettingOutlined,
} from '@ant-design/icons'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import SubMenu from 'antd/lib/menu/SubMenu'
import styled from 'styled-components'
import useWindowSize from '../../utils/common/use-window-size'
import useMyRoute from '../../utils/common/ues-my-route'

const { Sider } = Layout
const { Item } = Menu

interface SiderProps {}

const keyMap: any = {
	'/dashboard': '/dashboard',
	'/sale/lead': '/sale/lead',
	'/sale/lead-new': '/sale/lead',
	'/sale/working': '/sale/working',
	'/sale/schedule': '/sale/schedule',
	'/sale/customer': '/sale/customer',
	
	'/marketing/campaign': '/marketing/campaign',
	'/marketing/project': '/marketing/project',
}

const detailLeadRoute = '/sale/lead-detail/'
const updateLeadRoute = '/sale/lead-update/'

const customerRoute = ['/sale/customer-info', '/sale/customer-products', '/sale/customer-tickets']	

const SiderDashboard: React.FC<SiderProps> = () => {
	const [collapsed, setCollapsed] = useState(false)
	const { width } = useWindowSize()
	const { isPopUpRoute, pathname } = useMyRoute()
	const navigate = useNavigate()
	const redirect = ({ key }: any) => {
		navigate(key)
	}
	const onCollapse = (value: boolean) => {
		console.log(value)
		setCollapsed(value)
	}
	const isLeadRoute =
		pathname.includes(detailLeadRoute) || pathname.includes(updateLeadRoute)
	const isCustomerRoute = customerRoute.some((item: string) => pathname.includes(item))

	return (
		<div style={{ position: 'relative', background: '#fbfbff' }}>
			{isPopUpRoute && <OverlayDiv />}

			<SiderStyled
				collapsible={!isPopUpRoute}
				onCollapse={onCollapse}
				collapsedWidth={45}
				width={255}
				style={{ background: '#fbfbff' }}
				collapsed={width < 768 ? true : collapsed}
				checkWidth={width}
			>
				{!collapsed && width > 768 ? (
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
				)}
				<MenuStyled
					onClick={redirect}
					selectedKeys={
						keyMap[pathname]
							? keyMap[pathname]
							: isLeadRoute
							? '/sale/lead'
							: isCustomerRoute
							? '/sale/customer' 
							: '/dashboard'
					}
					mode='inline'
					defaultOpenKeys={['sale', 'marketing']}
				>
					<ItemStyled key='/dashboard' icon={<HomeOutlined />}>
						Dashboard
					</ItemStyled>
					<SubMenuStyled key='sale' title='Sale' icon={<RiseOutlined />} >
						<Item key='/sale/lead'>
							<span>Lead</span>
						</Item>
						<Item key='/sale/lead1'>
							<span>Cơ hội bán</span>
						</Item>
						<Item key='/sale/customer'>
							<span>Khách hàng 360</span>
						</Item>
						<Item key='/sale/working'>
							<span>Công việc</span>
						</Item>
						<Item key='/sale/schedule'>
							<span>Lịch hẹn</span>
						</Item>
						<Item key='/sale/lead4'>
							<span>Báo cáo</span>
						</Item>
					</SubMenuStyled>
					<SubMenuStyled key='marketing' title='Marketing' icon={<FlagOutlined />}>
					<Item key='/marketing/project'>
							<span>Dự án</span>
						</Item>
						<Item key='/marketing/campaign'>
							<span>Chiến dịch</span>
						</Item>
					</SubMenuStyled >
					<ItemStyled key='/lead2' icon={<TeamOutlined />}>
						Customers Profile
					</ItemStyled>
					<ItemStyled key='/lead3' icon={<SettingOutlined />}>
						Settings
					</ItemStyled>

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
	background: #fbfbff;
	overflow-y: auto;
	.ant-layout-sider-trigger {
		background: #fbfbff;
		color: #3b82f6;
		visibility: ${props => (props.checkWidth > 768 ? 'visible' : 'hidden')};
	}
`

const MenuStyled = styled(Menu)`
	/* height: calc(100vh - 0px); */
	background: #fbfbff;
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
	&.ant-layout-sider-has-trigger, &.ant-layout-sider-has-trigger {
		/* padding-bottom: 1000px !important; */
	}
	&.ant-menu-inline,
	&.ant-menu-vertical,
	&.ant-menu-vertical-left {
		border-right: none;
	}
`

const SubMenuStyled = styled(SubMenu)`
	&.ant-menu-item {
		padding-left: 24px !important;
	}

	.ant-menu-item-selected {
		background: #3b82f6 !important;
		color: #ffffff;
		border-right: none;
		&:hover {
			color: #ffffff;
		}
		border-radius: 6px;
	}

	.ant-menu-sub.ant-menu-inline {
		background: #fbfbff;
	}
`

const ItemStyled = styled(Item)`
	&.ant-menu-item-selected {
		background: #3b82f6 !important;
		color: #ffffff;
		border-right: none;
		&:hover {
			color: #ffffff;
		}
		border-radius: 6px;
	}

	&.ant-menu-item {
		padding-left: 11px !important;
	}
`
