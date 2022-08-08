import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoadingSpinner from '../../../components/LoadingSpinner'

const Components: TODO = {
	LazyUpdate: lazy(() => import('./update')),
    LazyManager: lazy(() => import('./manager')),
	LazyFeed: lazy(() => import('./feed')),
	LazyDetail: lazy(() => import('./detail')),
}

// might need different types of loading later.
const skeletonMap: TODO = {
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

const Page: React.FC = () => {
    return (
		<Routes>
			<Route
				path='/manager'
				element={<LazyComponent component={'LazyManager'} />}
			/>
			<Route
				path='/update/:id'
				element={<LazyComponent component={'LazyUpdate'} />}
			/>
			<Route
				path='/detail/:id'
				element={<LazyComponent component={'LazyDetail'} />}
			/>
			<Route
				path='/feed'
				element={<LazyComponent component={'LazyFeed'} />}
			/>
			<Route path='/*' element={<Navigate to='/' />} />
		</Routes>
	)
}
export default Page