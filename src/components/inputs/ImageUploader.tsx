import React, { useState } from 'react'
import { Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
// import ImgCrop from 'antd-img-crop'

function getBase64(img: TODO, callback: TODO) {
	const reader = new FileReader()
	reader.addEventListener('load', () => callback(reader.result))
	reader.readAsDataURL(img)
}

function beforeUpload(file: TODO) {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
	
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!')
	}

	if (file.size < 10) {
		message.error('Image must be at least 10kb')
		return false
	}
	// const isLt2M = file.size / 1024 / 1024 < 2
	// if (!isLt2M) {
	// 	message.error('Image must smaller than 2MB!')
	// }
	// return isJpgOrPng && isLt2M
	return isJpgOrPng
}

interface imageUploaderProps {
	id: number | null
	setConverImg: (img: string) => void
	coverImg: string
	uploadFile: (data: any) => TODO
	dataAppend: { name: string; value: any }[]
}

const ImageUploader: React.FC<imageUploaderProps> = ({
	id,
	setConverImg,
	coverImg,
	dataAppend,
	uploadFile,
}) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [imageUrl, setImageUrl] = useState<string>('')
	const [fileList, setFileList] = useState<any[]>([])

	const uploadAction = async (fileObj: any) => {
		const file = fileObj?.file
		var formdata = new FormData()
		formdata.append('file', file)
		dataAppend.forEach(item => {
			formdata.append(item.name, item.value)
		})

		if (file) {
			try {
				const res = await uploadFile(formdata)
				// console.log('res', res)
				if (res.status === 200 || res.status === 201) {
					fileObj.onSuccess(fileObj.file)
					setConverImg(res.data.responseData)
					message.success('Upload ảnh thành công')
				} else {
					message.error('Upload ảnh thất bại')
				}
			} catch (err) {
				console.log(err)
				message.error('Upload ảnh thất bại')
			}
		}
	}

	const handleChange = (info: TODO) => {
		setFileList(info.fileList)
		if (info.file.status === 'uploading') {
			setLoading(true)
			return
		}
		if (info.file.status === 'done') {
			getBase64(info.file.originFileObj, (imageUrl: TODO) => {
				setImageUrl(imageUrl)
				setLoading(false)
			})
		}
	}

	const uploadButton = (
		<div>
			{loading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8, padding: 5 }}>Upload Ảnh Bìa</div>
		</div>
	)
	return (
		<>
			{coverImg && (
				<img
					src={imageUrl || coverImg}
					alt='avatar'
					style={{ width: '60%', marginBottom: 10 }}
				/>
			)}
			{/* <ImgCrop 
			aspect={16/9}
			rotate
			modalWidth={700}
			onUploadFail={() => {
				console.log('failllllllllllllllllll')
				setFileList([])
				setImageUrl('')
			}}		
			quality={0.3}
			minZoom={0.2}
			> */}
			<Upload
				name='avatar'
				listType='picture-card'
				className='avatar-uploader'
				showUploadList={{
					showRemoveIcon: true,
					showPreviewIcon: false,
				}}
				fileList={fileList}
				beforeUpload={beforeUpload}
				onChange={handleChange}
				customRequest={uploadAction}
				onRemove={() => setConverImg('')}
				maxCount={1}
			>
				{uploadButton}
			</Upload>
			{/* </ImgCrop> */}
		</>
	)
}
export default ImageUploader
