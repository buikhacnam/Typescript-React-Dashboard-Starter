import React, { useState } from 'react'
import { Upload, message, Modal } from 'antd'

// function getBase64(img: TODO, callback: TODO) {
// 	const reader = new FileReader()
// 	reader.addEventListener('load', () => callback(reader.result))
// 	reader.readAsDataURL(img)
// }

// function getBase64Ex(file: any) {
// 	return new Promise((resolve, reject) => {
// 		const reader = new FileReader()
// 		reader.readAsDataURL(file)
// 		reader.onload = () => resolve(reader.result)
// 		reader.onerror = error => reject(error)
// 	})
// }

function beforeUpload(file: TODO) {
	// console.log('before upload', file)
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
	if (!isJpgOrPng) {
		message.error('You can only upload JPG/PNG file!')
	}
	// const isLt2M = file.size / 1024 / 1024 < 2
	// if (!isLt2M) {
	// 	message.error('Image must smaller than 2MB!')
	// }
	// return isJpgOrPng && isLt2M
	return isJpgOrPng
}

interface imageUploaderProps {
	id: number

	uploadFile: (data: any) => TODO
	dataAppend: { name: string; value: any }[]
	deleteImgFromGallery: (id: number, url: string) => void
}

let mapUrl = new Map<string, string>()

const ImageUploaderMultiple: React.FC<imageUploaderProps> = ({
	id,
	dataAppend,
	uploadFile,
	deleteImgFromGallery,
}) => {
	const [fileList, setFileList] = useState<any[]>([])

	const [previewImage, setPreviewImage] = useState('')
	const [previewVisible, setPreviewVisible] = useState(false)
	const [previewTitle, setPreviewTitle] = useState('')

	const uploadAction = async (fileObj: any) => {
		const file = fileObj?.file
		let formdata = new FormData()
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
					const urlRes = res.data.responseData[0].fileUrl

					mapUrl.set(file.uid, urlRes)

					let data = fileList.map((item: any) => {
						return {
							...item,
							thumbUrl: mapUrl.get(item.uid),
							status: 'done',
						}
					})

					setFileList(data)

					// message.success('Upload ảnh thành công')
				} else {
					fileObj.onError(fileObj.file)
					// message.error('Upload ảnh thất bại')
				}
			} catch (err) {
				console.log(err)
				message.error('Upload ảnh thất bại')
			}
		}
	}

	const handleChange = async (info: TODO) => {
		let data = info.fileList.map((item: any) => {
			return { ...item, percent: 60 }
		})
		setFileList(data)
	}

	const handlePreview = async (file: any) => {
		setPreviewImage(file.thumbUrl || file.url)
		setPreviewVisible(true)
		setPreviewTitle(
			file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
		)
	}

	const uploadButton = (
		<div>
			<div style={{ marginTop: 8, padding: 5 }}>Upload Ảnh</div>
		</div>
	)
	return (
		<>
			<Upload
				listType='picture-card'
				fileList={fileList}
				multiple={true}
				// className='avatar-uploader'
				showUploadList={{
					showRemoveIcon: true,
					showPreviewIcon: true,
				}}
				onPreview={handlePreview}
				beforeUpload={beforeUpload}
				onChange={handleChange}
				customRequest={uploadAction}
				// maxCount={1}
				onRemove={v => {
					console.log(mapUrl.get(v.uid))
					deleteImgFromGallery(id, mapUrl.get(v.uid) || '')
				}}
			>
				{uploadButton}
			</Upload>
			<Modal
				visible={previewVisible}
				title={previewTitle}
				footer={null}
				onCancel={() => setPreviewVisible(false)}
			>
				<img
					alt='example'
					style={{ width: '100%' }}
					src={previewImage}
				/>
			</Modal>
		</>
	)
}
export default ImageUploaderMultiple
