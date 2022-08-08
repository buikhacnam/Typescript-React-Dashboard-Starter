import { useLocation, useParams } from 'react-router-dom'

const useMyRoute = (): { pathname: string; isPopUpRoute: boolean } => {
	const location = useLocation()
	const param = useParams()
	const { pathname } = location

	const isPopUpRoute = [
		'/survey/update/',
		'/articles/update/',
		'/books/update/',
		'/books/read/',
		'/event/update/',
		'/banner/update/',
		'/gallery/update/',
		'/gallery/collection/',
	].some(route => pathname.includes(route))

	return {
		pathname,
		isPopUpRoute,
	}
}

export default useMyRoute
