import { Button, Divider, Row, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { Provider } from '../../../../modules/event/Context'
import FeedContainer from '../../../../modules/event/feed/FeedContainer'

interface ArticleFeedProps {}

const ArticleFeed: React.FC<ArticleFeedProps> = ({}) => {
	return (
		<Provider type='manager'>
			<Row justify='space-between' align='middle'>
				<Typography.Title level={3} style={{ marginBottom: 0 }}>
					Xem Sự Kiện
				</Typography.Title>
				<Link to='/event/update/new'>
					<Button type='primary'>Tạo sự kiện</Button>
				</Link>
			</Row>
			<Divider style={{ marginTop: '10px', marginBottom: '15px' }} />
			{/* <Row
				justify='space-between'
				align='middle'
				style={{ marginBottom: 16 }}
			>
				<div style={{ display: 'flex', alignItems: 'top' }}>
					<Filter />
					<SelectedKey />
				</div>
				<SearchAndBulkActions />
			</Row> */}

			<FeedContainer />
		</Provider>
	)
}
export default ArticleFeed
