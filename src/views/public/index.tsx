import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Layout, Menu, message } from 'antd'
import { Route, Routes, Navigate } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner'
import styled, { ThemeProvider } from 'styled-components'


const Components: TODO = {
	LazyQrPage: lazy(() => import('./checkQRCode')),
}


const LazyComponent = ({ component, ...props }: TODO) => {
	const View = Components?.[component] || Components['LazyQrPage']
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

const PublicPage: React.FC<IndexProps> = () => {
	// const { isPopUpRoute, pathname } = useMyRoute()
	// const [a, setA] = React.useState(0)
	// const [isTokenFound, setTokenFound] = React.useState(false)

	return (
		<>
			<Routes>
				<Route
					path='/qrcode/*'
					element={<LazyComponent component={'LazyQrPage'} />}
				/>
			</Routes>
		</>
	)
}
export default PublicPage
