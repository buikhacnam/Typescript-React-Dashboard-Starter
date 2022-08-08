import React, { useState } from 'react'
import { ContextValueType, useProviderContext } from '../Context'
import { Button, Dropdown, Input, Modal, Popconfirm, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
const { Menu }: any = require('antd')

export default function BulkActions() {
	const {
		reject,
		approve,
		setVisibleReject,
		visibleReject,
		actionLoading,
		selectedRow,
	}: ContextValueType = useProviderContext()
	const [rejectReason, setRejectReason] = useState('')

	const menu = (
		<Menu>
			<Popconfirm
				title="Duyệt bài?"
				onConfirm={() => approve()}
				onCancel={() => {}}
				okText="Duyệt"
				cancelText="Hủy"
  			>
				<Menu.Item>Duyệt</Menu.Item>
			</Popconfirm>
			<Menu.Item onClick={() => setVisibleReject(true)}>
				Từ chối
			</Menu.Item>
		</Menu>
	)

	if (!selectedRow?.length) {
		return null
	}
	return (
		<>
			<Dropdown overlay={menu} trigger={['click']}>
				<Button icon={<DownOutlined />}>Bulk Actions</Button>
			</Dropdown>
			<Modal
				title='Từ chối bài viết'
				visible={visibleReject}
				onCancel={() => {
					setVisibleReject(false)
					setRejectReason('')
				}}
				footer={null}
			>
				<div style={{ paddingBottom: 40 }}>
					<Input.TextArea
						placeholder='Nhập lí do từ chối bài viết'
						onChange={e => {
							setRejectReason(e.target.value)
						}}
						value={rejectReason}
					/>
					<Button
						onClick={() => {
							reject(rejectReason)
							setRejectReason('')
						}}
						style={{ float: 'right', margin: '8px 0px' }}
						loading={actionLoading}
						disabled={actionLoading}
					>
						Từ chối
					</Button>
				</div>
			</Modal>
		</>
	)
}
