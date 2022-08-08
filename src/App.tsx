import React, {useEffect, lazy, Suspense } from 'react'
import { StyleSheetManager, ThemeProvider } from 'styled-components'
// import theme, { darkTheme, GlobalStyle, lightTheme } from './styled/theme'
import { Route, Routes, Navigate } from 'react-router-dom'
import LoadingSpinner from './components/LoadingSpinner'
import checkAuth from './utils/common/checkAuth'
// import { useDarkMode } from './styled/useDarkmode'
const Components: TODO = {
	LazyDashboard: lazy(() => import('./views/dashboard')),
	LazyLoginView: lazy(() => import('./views/auth/Login4')),

	LazyAzurePage: lazy(() => import('./views/azureAuth')),
	LazyPublic: lazy(() => import('./views/public')),
}



// might need different types of loading later.
const skeletonMap: TODO = {
	LazyDashboard: <LoadingSpinner />,
	LazyView2: <LoadingSpinner />,
	LazyLoginView: <LoadingSpinner />,
}

const LazyComponent = ({ component, ...props }: TODO) => {
	const isAuthenticated = checkAuth()
	const View = Components?.[component] || Components['LazyDashboard']
	return (
		<Suspense
			// fallback={skeletonMap[component]}
			fallback={<LoadingSpinner />}
		>
			{isAuthenticated || component === 'LazyLoginView' ? (
				<View {...props} />
			) : (
				<Navigate to='/login' replace />
			)}
		</Suspense>
	)
}

interface AppProps {}

const App: React.FC<AppProps> = () => {
	// const {presentTheme} = useDarkMode()
	const handler = (e: any) => {
        e.preventDefault()
        localStorage.removeItem('currentPageLead')
		localStorage.removeItem('pageSizeLead')
        e.returnValue = false
    }

    useEffect(() => {
        window.addEventListener('beforeunload', handler)
        return () => window.removeEventListener('beforeunload', handler)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
	return (
		<>
			<StyleSheetManager disableVendorPrefixes>
				{/* <ThemeProvider theme={theme[presentTheme]}> */}
					{/* <GlobalStyle /> */}
					<Routes>
						<Route
							path='/login'
							element={
								<LazyComponent component={'LazyAzurePage'} />
							}
						/>
							
							<Route
							path='/public/*'
							element={
								<LazyComponent component={'LazyPublic'} />
							}
						/>
						<Route
							path='/*'
							element={
								<LazyComponent component={'LazyDashboard'} />
							}
						/>
					</Routes>
				{/* </ThemeProvider> */}
			</StyleSheetManager>
		</>
	)
}

export default App
