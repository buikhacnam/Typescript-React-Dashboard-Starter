import {Button, Pagination} from 'antd'
import styled from 'styled-components'
interface RenderPaginationProps {
	count: number
	page: { current: number; pageSize: number }
	setPage: (page: { current: number; pageSize: number }) => void
}
const RenderPagination = ({ count, page, setPage }: RenderPaginationProps) => {
	function onShowSizeChange(current: any, pageSize: any) {
		console.log('current', current, 'pageSize', pageSize)
		setPage({ current, pageSize })
	}
	const onChange = (current: any, pageSize: any) => {
		setPage({ current, pageSize })
	}

	function itemRender(current: any, type: any, originalElement: any) {
		if (type === 'next') {
			return <Button size='small' style={{marginLeft: 10 }}>Next</Button>
		}
		if (type === 'prev') {
			return <Button size='small' style={{marginRight: 10 }}>Previous</Button>
		}
		return originalElement
	}
	return (
		<div
			style={{
				marginTop: '16px',
				// marginBottom: '30px',
				textAlign: 'center',
			}}
		>
			<PaginationStyle
				size='small'
				// defaultCurrent={0}
				showSizeChanger
				onShowSizeChange={onShowSizeChange}
				current={page.current}
				pageSize={page.pageSize}
				total={count}
				onChange={onChange}
				showTotal={(total:any, range:any) =>
					`Showing ${range[0]} to ${range[1]} of ${total} results`
				}
				itemRender={itemRender}
			/>
		</div>
	)
}

const PaginationStyle = styled(Pagination)`
	/* @media (min-width: 1000px) {
		.ant-pagination-next {
			position: absolute;
			right: 24px;
		}

		.ant-pagination-prev {
			position: absolute;
			right: 74px;
			margin-left: 10px;
		}
	} */

}

	.ant-pagination-options {
		float: left;
	}

	.ant-pagination-total-text {
		float: left;
		margin-right: 5px;
	}
	.ant-pagination-item {
		background: transparent;
		border: none;
	}

	.ant-pagination-item-active {
		border-top: 1px solid #1890ff;
	}
`
export default RenderPagination