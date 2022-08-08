import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Layout, Menu, message } from 'antd'
import SiderDashboard from '../../components/layout/Sider'
import { Route, Routes, Navigate } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner'
import useMyRoute from '../../utils/common/ues-my-route'
import { RenderBreadcrumb } from '../../components/layout/RenderBreadcrumb'
import Header from '../../components/layout/Header'
import styled, { ThemeProvider } from 'styled-components'
import theme, { GlobalStyle, ThemeType } from '../../styled/theme'
// import { getToken, onMessageListener } from '../../firebaseInit'
const { SubMenu } = Menu
const { Content } = Layout

const Components: TODO = {
	LazyEvent: lazy(() => import('./event')),
	LazySearch: lazy(() => import('./search')),
	LazyNotification: lazy(() => import('./notification')),
}

// might need different types of loading later.
const skeletonMap: TODO = {
	LazyDashboard: <LoadingSpinner />,
	LazyLead: <LoadingSpinner />,
}

const LazyComponent = ({ component, ...props }: TODO) => {
	const View = Components?.[component] || Components['LazyDashboard']
	return (
		<Suspense
			// fallback={skeletonMap[component]}
			fallback={<LoadingSpinner />}
		>
			<View {...props} />
		</Suspense>
	)
}

interface IndexProps {}

const Dashboard: React.FC<IndexProps> = () => {
	// const { isPopUpRoute, pathname } = useMyRoute()
	// const [a, setA] = React.useState(0)
	// const [isTokenFound, setTokenFound] = React.useState(false)
	const [presentTheme, setTheme] = useState<ThemeType>('darkTheme')

	const setMode = (mode: ThemeType) => {
		window.localStorage.setItem('voc-theme', mode)
		setTheme(mode)
	}

	const toggleTheme = () => {
		presentTheme === 'darkTheme'
			? setMode('lightTheme')
			: setMode('darkTheme')
	}

	useEffect(() => {
		const localTheme: any = window.localStorage.getItem('voc-theme') || 'darkTheme'
		setTheme(localTheme)
	}, [])

	// React.useEffect(() => {
	// 	let data;

	// 	async function tokenFunc() {
	// 	  data = await getToken(setTokenFound);
	// 	  console.log('data', data)
	// 	  if (data) {
	// 		console.log("Token is", data);
	// 	  }
	// 	  return data;
	// 	}

	// 	tokenFunc();
	// }, [setTokenFound, a]);

	// onMessageListener()
	// .then((payload) => {
	// //   setShow(true);
	// //   setNotification({
	// //     title: payload.notification.title,
	// //     body: payload.notification.body,
	// //   });
	// 	console.log('hiiiiiiiiiiiiiiiiii')
	//   console.log(payload);
	//   message.info(payload.notification.title)
	//   setA(a+1)
	// })
	// .catch((err) => console.log("failed: ", err));
	return (
		<>
			<ThemeProvider theme={theme[presentTheme]}>
				<GlobalStyle />

				<Layout>
					<Layout>
						<SiderDashboard />
						<LayoutStyled>
							<Layout.Header
								style={{
									// background: '#ffffff',
									position: 'fixed',
									top: 0,
									left: 0,
									right: 0,
									padding: '0 42px',
									opacity: 0.99,
									zIndex: 1,
								}}
							>
								<Header
									toggleTheme={toggleTheme}
									presentTheme={presentTheme}
								/>
							</Layout.Header>
							{/* <RenderBreadcrumb pathname={pathname} /> */}
							<Content
								className='site-layout-background'
								style={{
									padding: 24,
									margin: 0,
									minHeight: 280,
									marginTop: 64,
								}}
							>
								<Routes>
									<Route
										path='/event/*'
										element={
											<LazyComponent
												component={'LazyEvent'}
											/>
										}
									/>
										<Route
										path='/search'
										element={
											<LazyComponent
												component={'LazySearch'}
											/>
										}
									/>
									<Route
										path='/notification'
										element={
											<LazyComponent
												component={'LazyNotification'}
											/>
										}
									/>
									
									<Route
										path='/*'
										element={
											<Navigate to='/event/feed' />
										}
									/>
								</Routes>
							</Content>
						</LayoutStyled>
					</Layout>
				</Layout>
			</ThemeProvider>
		</>
	)
}
export default Dashboard

const LayoutStyled = styled(Layout)`
	height: 97vh;
	overflow-y: auto;

	&::-webkit-scrollbar {
		width: 10px;
	}
	&::-webkit-scrollbar-thumb {
		background-color: rgba(126, 119, 119, 0.2);
	}
`
