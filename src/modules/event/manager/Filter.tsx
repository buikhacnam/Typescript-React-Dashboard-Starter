import React, { useState, useRef } from 'react'
import { Button, Drawer, Form, Input, Select, Checkbox, DatePicker } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { debounce } from '../../../utils/common/debounce'
import { ContextValueType, useProviderContext } from '../Context'
const { Option } = Select
const { RangePicker }:any = DatePicker

interface FilterProps {
	type?: string
}

const Filter: React.FC<FilterProps> = ({type}) => {
	const [visible, setVisible] = useState(false)
	const formRef = useRef<any>(null)

	const {
		searchState,
		setSearchState,
		selectedRow
	}: ContextValueType = useProviderContext()

	const showDrawer = () => {
		setVisible(true)
	}
	const onClose = () => {
		setVisible(false)
	}

	function onChangeDate(value: any, dateString: any) {
		if (!value?.[0] && !value?.[1]) {
            setSearchState({
				...searchState,
				startTime: {
					// ...searchState.startTime,
					value:'',
				},
				endTime: {
					// ...searchState.endTime,
					value: '',
				},
			})
		} else {
			setSearchState({
				...searchState,
				startTime: {
					// ...searchState.startTime,
					value: value[0].format('YYYY-MM-DD'),
				},
				endTime: {
					// ...searchState.endTime,
					value: value[1].format('YYYY-MM-DD'),
				},
			})
		}
	}

	const delayedQuery = useRef(
		debounce(
			(e: any) =>
				setSearchState({
					...searchState,
					[e.target.name]: {
						...searchState[e.target.name],
						value: e.target.value,
					},
				}),
			700
		)
	).current

	const handleChangeInput = (e: any) => {
		delayedQuery(e)
	}

	return (
		<>
			<Button onClick={() => showDrawer()}>
				Lọc <FilterOutlined />
			</Button>
			{selectedRow?.length > 0 ? <div style={{marginTop: 16}}><span>Đã chọn {selectedRow.length} </span></div>: null}

			<Drawer
				title='Lọc Events'
				placement='right'
				onClose={onClose}
				visible={visible}
                width={550}
			>
				<Wrapper>
					<Form ref={formRef}>
					{!type ?
						<FieldContainer>
							<Form.Item labelCol={{ span: 24 }}
							wrapperCol={{ span: 24 }}  name='status' label='Trạng thái'>
								<Select
									placeholder='Chọn trạng thái'
									allowClear
									onChange={e =>
										setSearchState({
											...searchState,
											status: {
												value: e,
											},
										})
									}
								>
									<Option key='Draft' value='Draft'>
										Draft
									</Option>

									<Option key='InActive' value='InActive'>
										InActive
									</Option>
									<Option value='Submit'>Submit</Option>
								<Option value='Approve'>Approve</Option>
								<Option value='Reject'>Reject</Option>
								</Select>
							</Form.Item >
						</FieldContainer> : null }

						<FieldContainer>
							<Form.Item labelCol={{ span: 24 }}
							wrapperCol={{ span: 24 }} name='time' label='Thời gian'>
								<RangePicker
									placeholder={['Từ ngày', 'Đến ngày']}
									showTime={{ format: 'YYYY/MM/DD' }}
									onChange={onChangeDate}
									format='DD/MM/YYYY'
								/>
							</Form.Item>
						</FieldContainer>

						<FieldContainer>
							<Form.Item labelCol={{ span: 24 }}
							wrapperCol={{ span: 24 }} label='Tiêu đề'>
								<Input
									name={'name'}
									style={{ marginBottom: 16 }}
									onChange={handleChangeInput}
									placeholder='Nhập tiêu đề'
								/>
							</Form.Item>
						</FieldContainer>

						<FieldContainer>
							<Form.Item labelCol={{ span: 24 }}
							wrapperCol={{ span: 24 }} label='Mô tả'>
								<Input
									name={'content'}
									style={{ marginBottom: 16 }}
									onChange={handleChangeInput}
									placeholder='Nhập content'
								/>
							</Form.Item>
						</FieldContainer>

						
					</Form>
				</Wrapper>
			</Drawer>
		</>
	)
}
export default Filter

const Wrapper = styled.div`
	padding: 24px;
`
const FieldContainer = styled.div`
	margin-bottom: 10px;
`
