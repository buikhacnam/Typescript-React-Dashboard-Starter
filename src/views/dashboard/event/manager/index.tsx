import { Button, Divider, Row, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { Provider } from '../../../../modules/event/Context'
import Filter from '../../../../modules/event/manager/Filter'
import DataTable from '../../../../modules/event/manager/Table'

export default function Manager() {
	return (
		<Provider type='manager'>
			<Row justify='space-between' align='middle'>
				<Typography.Title level={3} style={{ marginBottom: 0 }}>
					Quản Lý Sự Kiện
				</Typography.Title>
				<Link to='/event/update/new'>
					<Button type='primary'>Tạo Sự Kiện</Button>
				</Link>
			</Row>
			<Divider style={{ marginTop: '10px', marginBottom: '15px' }} />
			<Row
				justify='space-between'
				align='middle'
				style={{ marginBottom: 16 }}
			>
				<div style={{ display: 'flex', alignItems: 'top' }}>
					<Filter />
					{/* <SelectedKey /> */}
				</div>
				{/* <SearchAndBulkActions /> */}
			</Row>

			<DataTable type='manager' />
		</Provider>
	)
}
