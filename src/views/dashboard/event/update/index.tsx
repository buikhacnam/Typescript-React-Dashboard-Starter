import React from 'react'
import { useParams } from 'react-router-dom'
import PopupTitle from '../../../../components/layout/PopupTitle'
import UpdateForm from '../../../../modules/event/update/UpdateForm'
import { Popupwrapper } from '../../../../components/layout/Popupwrapper'
import { PopupOverlay } from '../../../../components/layout/PopupOverlay'

export default function Update() {
	const param = useParams()

	return (
		<>
			<Popupwrapper>
				<PopupTitle
					title={
						param?.id && param?.id !== 'new'
							? 'Cập nhật sự kiện'
							: 'Tạo mới sự kiện'
					}
					backUrl={''}
				/>
				<UpdateForm />
			</Popupwrapper>
			<PopupOverlay />
		</>
	)
}
