import React, { useEffect } from 'react'
import styled from 'styled-components'
import { CustomSpin } from '../../../components/LoadingSpinner'
import RenderPagination from '../../../components/Pagination'
import { useProviderContext, ContextValueType } from '../Context'

interface FeedContainerProps {}

const FeedContainer: React.FC<FeedContainerProps> = ({}) => {
	const { data, status, page, setPage }: ContextValueType = useProviderContext()

	const list = data?.listObject || []

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [page])

	return (
		<>
			<div>feed</div>
		</>
	)
}
export default FeedContainer

const PostContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	row-gap:16px;
`
