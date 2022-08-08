import {
	Button,
	Checkbox,
	DatePicker,
	Divider,
	Form,
	Input,
	message,
	Select,
	Spin,
} from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import ImageUploader from '../../../components/inputs/ImageUploader'
import { useNavigate, useParams } from 'react-router-dom'
import { CenterSpin, SpinOverlay } from '../../../components/LoadingSpinner'
import moment from 'moment'
const {RangePicker}:any = DatePicker
interface UpdateFormProps {}
const { Option } = Select
const { Item } = Form
const UpdateForm: React.FC<UpdateFormProps> = ({}) => {

	const onFinish = (values: any) => {
		
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div style={{ position: 'relative' }}>
			<div style={{ position: 'relative' }}>
				{/* {(fetchDetailLoading || postLoading) && <SpinOverlay />} */}
				<Form
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					// ref={formRef}
				>
							<Item
								label='Tiêu đề sự kiện:'
								rules={[
									{
										required: true,
										message:
											'Vui lòng nhập dữ liệu bắt buộc!',
									},
								]}
								name='name'
								labelCol={{ span: 24 }}
								wrapperCol={{ span: 24 }}
							>
								<Input.TextArea placeholder='Nhập tiêu đề sự kiện' />
							</Item>

							<Item
							label='Tóm tắt nội dung'
							rules={[
								{
									required: true,
									message: 'Vui lòng nhập dữ liệu bắt buộc!',
								},
							]}
							name='shortContent'
							labelCol={{ span: 24 }}
							wrapperCol={{ span: 24 }}
						>
							<Input.TextArea placeholder='Nhập tiêu đề bài viết' maxLength={199} rows={4} />
						</Item>

							
				</Form>
			</div>
		</div>
	)
}
export default UpdateForm

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 500px;
	grid-gap: 24px;
`
