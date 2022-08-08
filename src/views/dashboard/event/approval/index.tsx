import { Divider, Row, Typography } from 'antd'
import { Provider } from '../../../../modules/event/Context'
import DataTable from '../../../../modules/event/manager/Table'
import BulkActions from '../../../../modules/event/manager/BulkActions'
import Filter from '../../../../modules/event/manager/Filter'

export default function ArticleManager() {
	return (
		<>
			<Provider type='approval'>
				<Row justify='space-between' align='middle'>
					<Typography.Title level={3} style={{ marginBottom: 0 }}>
						Duyệt Sự Kiện
					</Typography.Title>
				</Row>
				<Divider style={{ marginTop: '10px', marginBottom: '15px' }} />
				<div
					style={{
						marginBottom: 16,
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<Filter  type='approval'/>
					<BulkActions />
				</div>

				<DataTable type='approval' />
			</Provider>
		</>
	)
}
