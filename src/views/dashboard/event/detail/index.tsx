import React from 'react'
import { PopupOverlay } from '../../../../components/layout/PopupOverlay'
import PopupTitle from '../../../../components/layout/PopupTitle'
import { Popupwrapper } from '../../../../components/layout/Popupwrapper'
import DetailEvent from '../../../../modules/event/detail'

export default function DetailPage() {
	return (
		<>
			<Popupwrapper>
				<PopupTitle title='Chi tiết sự kiện' backUrl={''} />
                <DetailEvent />
			</Popupwrapper>
			<PopupOverlay />
		</>
	)
}
