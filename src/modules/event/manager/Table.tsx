import React, { useState } from 'react'
import { Table, Button, Menu, Dropdown, Space, Popconfirm, Tooltip, Modal, Input } from 'antd'
import { CheckOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import deleteConfirm from '../../../components/DeleteConfirm'
import RenderPagination from '../../../components/Pagination'
import { ContextValueType, useProviderContext } from '../Context'

const RenderAction = (
	action: string,
	props: any,
	approve: (list: number[]) => void,
	reject: (reason: string, list: number[]) => void,
	setVisible: (visible: boolean) => void,
	setIds: (ids: number[]) => void,
	actionLoading: boolean,
	type: 'manager' | 'approval'
) => {
	
	const { id } = props
	

	return (
		<>
			{type === 'approval' ? (
				<Space size='middle'>
					<Popconfirm
						title="Duyệt bài?"
						onConfirm={() => {
							approve([id])
						}}
						onCancel={() => {}}
						okText="Duyệt"
						cancelText="Hủy"
  					>
						<a
							
							style={{
								color: '#6DB33F',
							}}
						>
							<CheckOutlined />
						</a>
						</Popconfirm>
						<a
							onClick={() => {
								setVisible(true)
								setIds([id])
							}}
							style={{
								color: 'orange',
							}}
						>
							<ExclamationCircleOutlined />
						</a>
				</Space>
			) : (
				<Space>
					<Tooltip title='Chỉnh sửa'>
						<Link to={`/event/update/${id}`}>
							<EditOutlined style={{marginRight: 10}}/>
						</Link>
					</Tooltip>
					{/* <Tooltip title='Xóa'>
						<a
							onClick={() =>
								deleteConfirm(
									'Xóa bài viết',
									'Bạn có chắc chắn muốn xóa bài viết này không?',
									() => {}
								)
							}
							style={{ color: 'red' }}
						>
							<DeleteOutlined />
						</a>
					</Tooltip> */}
				</Space>
			)}
		</>
	)
}

interface TableProps {
	type: 'manager' | 'approval'
}

const DataTable: React.FC<TableProps> = ({type}) => {

	const {
		data,
		status,
		page,
		setPage,
		reject,
		approve,
		setVisibleReject,
		visibleReject,
		actionLoading,
		handleSelectChange,
		selectedRow,
	}: ContextValueType = useProviderContext()

	
	const [ids, setIds] = useState<number[]>([])
	const [rejectReason, setRejectReason] = useState('')

	const columns: any = [
		{
			title: 'ID',
			dataIndex: 'id',
			ellipsis: true,
			width: 100,
			fixed: 'left',
		},
		{
			title: 'TIÊU ĐỀ',
			dataIndex: 'name',
			ellipsis: true,
			fixed: 'left',
			render: (text: string, record: any) => {
				const { id } = record
				return (
					<Link to={`/event/detail/${id}`}
						// onClick={() => {
						// 	setProjectId(id)
						// 	setDrawerVis(true)
						// }}
					>
						{text}
					</Link>
				)
			},
			width: 250
		},
		{
			title: 'TRẠNG THÁI',
			dataIndex: 'status',
			ellipsis: true,
		},
		{
			title: 'NGƯỜI TẠO',
			dataIndex: 'createdBy',
			ellipsis: true,
		},
    {
			title: 'NGÀY BẮT ĐẦU',
			dataIndex: 'startTime',
			ellipsis: true,
			render: (text: string, record: any) => {
				if(record?.startTime) {
					return <span>{text?.substring(0,10)}</span>
				}
			}
        
			
		},{
			title: 'NGÀY KẾT THÚC',
			dataIndex: 'endTime',
			ellipsis: true,
			render: (text: string, record: any) => {
				if(record?.endTime) {
					return <span>{text?.substring(0,10)}</span>
				}
			}
           
		},
		{
			title: 'QUAN TÂM',
			dataIndex: 'totalUserCared',
			ellipsis: true,
		},{
			title: 'THAM GIA',
			dataIndex: 'totalUserParticipated',
			ellipsis: true,
		},
		{
			title: 'VÉ',
			dataIndex: 'numOfTicket',
			ellipsis: true,
		},{
			title: 'VÉ TRỐNG',
			dataIndex: 'numOfTicketRemain',
			ellipsis: true,
		},
		{
			title: '',
			render: (text: string, props: any) =>
				RenderAction(
					text,
					props,
					approve,
					reject,
					setVisibleReject,
					setIds,
					actionLoading,
					type
				),
			fixed: 'right',
			width: 70,
		},
	]

	return (
		<div>
			<Table
				size='small'
				columns={columns}
				dataSource={data?.listObject}
				rowKey={(record: any) => record.id}
				pagination={false}
				loading={status === 'loading'}
				scroll={{ y: '57vh', x: '95vw'}}
				rowSelection={type === 'approval' ? {
					selectedRowKeys: selectedRow,
					type: 'checkbox',
					onChange: handleSelectChange,
				}: undefined}
			/>
			<div>
				<RenderPagination
					count={data?.count}
					page={page}
					setPage={setPage}
				/>
			</div>
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
							reject(rejectReason, ids)
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
		</div>
	)
}
export default DataTable




