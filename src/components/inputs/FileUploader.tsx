import React, { useState } from 'react'
import { Upload, message, Button } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import {  } from '../../api'
import { UploadOutlined } from '@ant-design/icons'

function getBase64(img: TODO, callback: TODO) {
	const reader = new FileReader()
	reader.addEventListener('load', () => callback(reader.result))
	reader.readAsDataURL(img)
}

function beforeUpload(file: TODO, type: string[], sizeLimit: number | undefined) {

    const isValid = type.includes(file.type) || type?.length === 0
	if(!isValid ) {
        message.error('You can only upload ' + type.join(', ') + ' file! Not ' + file.type)
    }
    
	// const isLt2M = file.size / 1024 / 1024 < 2
	// if (!isLt2M) {
	// 	message.error('Image must smaller than 2MB!')
	// }
	// return isJpgOrPng && isLt2M
    if(sizeLimit) {
        if((file.size / 1024 / 1024) > sizeLimit) {
            message.error('File size must smaller than ' + sizeLimit + 'KB!')
            return false
        }
    }
	return isValid
}

interface fileUploaderProps {
	title: string
	id: number | null
	setDataUrl: (img: string) => void
	dataUrl: string
    uploadFile: (data: any) => TODO
    dataAppend: {name: string, value: any}[]
    typeFile: string[]
    sizeLimit?: number | undefined
}

const FileUploader: React.FC<fileUploaderProps> = ({title, id, setDataUrl, dataUrl, uploadFile, dataAppend, typeFile, sizeLimit }) => {
	const [loading, setLoading] = useState<boolean>(false)

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
					setDataUrl(res.data.responseData)
					message.success('Upload thành công')
				} else {
					message.error('Upload thất bại')
					message.error(res?.data?.responseData)

				}
			} catch (err:any) {
				// console.log(err?.data?.responseData)
				message.error('Upload thất bại')
				message.error(err?.data?.responseData)
			}
		}
	}

	const handleChange = (info: TODO) => {
		if (info.file.status === 'uploading') {
			setLoading(true)
			return
		}
		if (info.file.status === 'done') {
			getBase64(info.file.originFileObj, (imageUrl: TODO) => {
				setLoading(false)
			})
		}
	}

	const uploadButton = (
		<Button icon={<UploadOutlined />}>{title}</Button>
	)
	return (
		<div style={{marginBottom: 16, display: 'flex', alignItems: 'baseline', gap: 24}}>
			
			<Upload
				name='file'
				showUploadList={{
					showRemoveIcon: true,
					showPreviewIcon: false,
				}}
				beforeUpload={file => beforeUpload(file, typeFile, sizeLimit)}
				onChange={handleChange}
				customRequest={uploadAction}
				maxCount={1}
				onRemove={() => setDataUrl('')}
			>
				{uploadButton}
			</Upload>

            {dataUrl && <a style={{display: 'block', marginBottom: 8}} href={dataUrl} target={'_blank'} rel="noreferrer">{dataUrl}</a>}

		</div>
	)
}
export default FileUploader
