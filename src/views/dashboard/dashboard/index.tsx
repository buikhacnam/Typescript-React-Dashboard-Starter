import React from 'react'
import Cookie from 'js-cookie'
import { message } from 'antd'
import {useNavigate} from 'react-router-dom'

interface dashboardProps {

}

const DashboardPage: React.FC<dashboardProps> = ({}) => {
    const navigate = useNavigate()
    const logoutUser = () => {
        Cookie.remove('crm-refresh')
        Cookie.remove('crm-access')
        Cookie.remove('crm-user')
        message.success('You have been logged out')
        navigate('/login')
    }
    return <>
    <img src='/img/fake-dashboard.svg' width='100%' height='auto'/>
    </>
}
export default DashboardPage