import React, { lazy, Suspense } from 'react'
import { Layout, Menu, message } from 'antd'
import SiderDashboard from '../../components/layout/Sider'
import { Route, Routes, Navigate } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner'
import useMyRoute from '../../utils/common/ues-my-route'
import { RenderBreadcrumb } from '../../components/layout/RenderBreadcrumb'
import { getToken, onMessageListener } from '../../firebaseInit'
const { SubMenu } = Menu
const { Content } = Layout

const Components: TODO = {
	LazyDashboard: lazy(() => import('./dashboard')),
	LazySale: lazy(() => import('./sale')),
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
	const { isPopUpRoute, pathname } = useMyRoute()
	const [a, setA] = React.useState(0)
    const [isTokenFound, setTokenFound] = React.useState(false);

	React.useEffect(() => {
		let data;
	
		async function tokenFunc() {
		  data = await getToken(setTokenFound);
		  console.log('data', data)
		  if (data) {
			console.log("Token is", data);
		  }
		  return data;
		}
	
		tokenFunc();
	}, [setTokenFound, a]);

	onMessageListener()
    .then((payload) => {
    //   setShow(true);
    //   setNotification({
    //     title: payload.notification.title,
    //     body: payload.notification.body,
    //   });
		console.log('hiiiiiiiiiiiiiiiiii')
      console.log(payload);
	  message.info(payload.notification.title)
	  setA(a+1)
    })
    .catch((err) => console.log("failed: ", err));
	return (
		<>
			<Layout>
				<Layout>
					<SiderDashboard />
					<Layout
						style={{
							background: !isPopUpRoute ? '#ffffff' : 'none',
						}}
					>
						{!isPopUpRoute && (
							<RenderBreadcrumb pathname={pathname} />
						)}
						<Content
							className='site-layout-background'
							style={{
								padding: 24,
								margin: 0,
								minHeight: 280,
							}}
						>
							<Routes>
								{/* <Route
									path='/'
									element={<Navigate to='/dashboard' />}
								/> */}
								<Route
									path='/dashboard'
									element={
										<LazyComponent
											component={'LazyDashboard'}
										/>
									}
								/>
								<Route
									path='/sale/*'
									element={
										<LazyComponent
											component={'LazySale'}
										/>
									}
								/>
								<Route
									path='/*'
									element={<Navigate to='/dashboard' />}
								/>
							</Routes>
						</Content>
					</Layout>
				</Layout>
			</Layout>
		</>
	)
}
export default Dashboard
