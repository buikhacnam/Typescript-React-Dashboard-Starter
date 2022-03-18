import { useLocation } from 'react-router-dom'

const useMyRoute = (): {pathname: string, isPopUpRoute: boolean} => {
	const location = useLocation()
	const { pathname } = location
	const popUpRoute = ['/sale/lead-new', '/sale/lead-import', '/sale/lead-assign']
	const popUpRoute2 = '/sale/lead-detail/'
	const popUpRoute3 = '/sale/lead-update/'

	const isPopUpRoute =
		popUpRoute.includes(pathname) || pathname.includes(popUpRoute2) || pathname.includes(popUpRoute3)

	return {
        pathname,
		isPopUpRoute,
	}
}

export default useMyRoute
