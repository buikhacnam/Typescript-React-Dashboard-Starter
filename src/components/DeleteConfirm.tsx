import { Modal } from 'antd'
import { WarningOutlined } from '@ant-design/icons'

export default function deleteConfirm(
	title: string,
	content: string,
	onOk: (id?: any) => void,
	onCancel = () => {},
	okText = 'Xóa',
	cancelText = 'Để sau'
) {
	Modal.confirm({
		title,
		icon: <WarningOutlined style={{ color: '#DC2626' }} />,
		content,
		okText,
		cancelText,
		okButtonProps: { danger: true },
		onOk,
		width: 450,
	})
}
