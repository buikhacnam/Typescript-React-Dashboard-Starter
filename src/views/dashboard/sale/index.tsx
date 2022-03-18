import React, { lazy, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import LoadingSpinner from '../../../components/LoadingSpinner'

const Components: TODO = {
    //lead
	// LazyLead: lazy(() => import('./lead/lead-list')),
	LazyLead2: lazy(() => import('./lead/lead-list2')),
	
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

interface Props {}

const SalePage: React.FC<Props> = ({}) => {
	return (
		<Routes>
			<Route
				path='/lead'
				element={<LazyComponent component={'LazyLead2'} />}
			/>
			<Route
				path='/lead-detail/:id'
				element={<LazyComponent component={'LazyLeadDetail'} />}
			/>
			<Route path='/*' element={<Navigate to='/dashboard' />} />
		</Routes>
	)
}
export default SalePage
