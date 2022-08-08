import React from 'react'
import PopupTitle from '../../../components/layout/PopupTitle'
import { Popupwrapper } from '../../../components/layout/Popupwrapper'
import { PopupOverlay } from '../../../components/layout/PopupOverlay'

interface NotificationPageProps {}

const NotificationPage: React.FC<NotificationPageProps> = ({}) => {
	return (
		<>
			<Popupwrapper>
				<PopupTitle title={'Thông báo'} backUrl={''} />
				Notification Page
			</Popupwrapper>
			<PopupOverlay />
		</>
	)
}
export default NotificationPage
