import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { approveEvent, rejectEvent, searchEventManager } from '../../api'

const Context = React.createContext<TODO>(null)

export const Provider = ({ children, type }: { children: React.ReactNode, type: 'manager' | 'approval' }) => {
	const initialSearch: TODO = {
		status: { value: type === 'approval'? 'Submit': '' },
		content: { value: '' },
		name: { value: '' },
		startTime: {
			value: '',
		},
		endTime: {
			value: '',
		}
	}
	const [page, setPage] = useState({ current: 1, pageSize: 20 })
	const [searchState, setSearchState] = useState(initialSearch)
	const [sortDirection, setSortDirection] = useState('')
	const [sortBy, setSortBy] = useState('')

	const [actionLoading, setActionLoading] = useState(false)
	const [visibleReject, setVisibleReject] = useState(false)
	const [idSelected, setIdSelected] = useState([])
	const [selectedRow, setSelectedRow] = useState<any>(null)
	
	const fetchSearchQuery = async ({queryKey}: any) => {
		const currentPage = queryKey[1]
		const pageSize = queryKey[2]
		const { name, status, startTime, endTime, content } = queryKey[3]

		const query = `&name=${name.value || ''}&content=${
			content.value || ''
		}&status=${
			status.value || ''
		}&startTime=${startTime.value || ''}&endTime=${endTime.value || ''}`

		const sort = `&orderBy=${sortBy}&orderType=${sortDirection}`

			const dataRes = await searchEventManager(
				currentPage,
				pageSize,
				query
			)
			const data = dataRes?.data?.responseData
			return data
	}

	const { data, status, refetch } = useQuery(
		['searchEventManager', page.current, page.pageSize, searchState],
		fetchSearchQuery,
        {keepPreviousData: true} 
	)

	const reject = async (reason: string, list?: number[]) => {
		setActionLoading(true)
		try {
			if (!list?.length) {
				await rejectEvent(idSelected, reason)
			} else {
				await rejectEvent(list, reason)
			}
			message.success('Từ chối thành công!')
			setVisibleReject(false)
			// fetchSearch()
			refetch()
		} catch (err) {
			console.log(err)
			message.error('Từ chối thất bại!')
		}
		setActionLoading(false)
		setSelectedRow(null)
	}

	const approve = async (list?: number[]) => {
		setActionLoading(true)
		try {
			if (!list) {
				await approveEvent(idSelected)
			} else {
				await approveEvent(list)
			}
			message.success('Duyệt thành công')
			// fetchSearch()
			refetch()
		} catch (err) {
			console.log(err)
			message.error('Duyệt thất bại!')
		}
		setActionLoading(false)
		setSelectedRow(null)
	}

	const handleSelectChange = (selectedRowKeys: any, selectedRows: any[]) => {
		setSelectedRow(selectedRowKeys)
		if (selectedRowKeys.length > 0) {
			setIdSelected(selectedRowKeys.toString().split(','))
		} else {
			setIdSelected([])
		}
	}

	return (
		<Context.Provider
			value={{
				page,
				setPage,
				searchState,
				setSearchState,
				sortDirection,
				setSortDirection,
				sortBy,
				setSortBy,
				data, 
				status,
				reject,
				approve,
				actionLoading,
				visibleReject,
				setVisibleReject,
				handleSelectChange,
				idSelected,
				selectedRow,
			}}
		>
			{children}
		</Context.Provider>
	)
}

export const useProviderContext = () => {
	const context = React.useContext(Context)
	if (context === undefined) {
		throw new Error('useProviderContext must be used within a Provider')
	} else {
		return context
	}
}

export type ContextValueType = {
	page: { current: number; pageSize: number }
	setPage: (page: { current: number; pageSize: number }) => void
	searchState: TODO
	setSearchState: (searchState: TODO) => void
	sortDirection: string
	setSortDirection: (sortDirection: string) => void
	sortBy: string
	setSortBy: (sortBy: string) => void
	data: TODO
	status: "loading" | "idle" | "error" | "success"
	reject: (reason: string, list?: number[]) => void
	approve: (list?: number[]) => void
	actionLoading: boolean
	visibleReject: boolean
	setVisibleReject: (visibleReject: boolean) => void
	handleSelectChange: (selectedRowKeys: any, selectedRows: any[]) => void
	idSelected: string[]
	selectedRow: any
}
