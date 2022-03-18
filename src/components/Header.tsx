import React from 'react'
import { Link } from 'react-router-dom'

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
	return (
		<>
            <p></p>
			<Link to='/suspense'>Suspense</Link>
		</>
	)
}
export default Header
