import { Typography, Modal, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getEventDetailById, searchEventInterest } from '../../../api'
import { formatDate } from '../../../utils/common/date-utils'


export default function DetailEvent() {
	const param = useParams()
	
	return (
		<div>
			{param.id}
		</div>
	)
}

