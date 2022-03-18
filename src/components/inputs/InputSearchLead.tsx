import React, { useState, useEffect } from 'react'
import { Tag, Popover, Empty, Menu, Dropdown } from 'antd'
import styled from 'styled-components'
// import { searchLeadText } from '../../api'
import { CustomSpin } from '../LoadingSpinner'
import EmptyData from '../EmptyData'

type valueType = { label: string; value: string; id: number }

type stateType = {
	value: valueType[]
	focused: boolean
	inputValue: string
}

interface Props {
	state: stateType
	setState: (args: any) => void
}

const InputSearchLead: React.FC<Props> = ({ state, setState }) => {
	const [focus, setFocus] = useState(false)
	const [leads, setLeads] = useState([])
	const [loading, setLoading] = useState(false)
	const [visible, setVisible] = useState(false)
	const inputRef = React.useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (state.inputValue) {
			console.log('useEffect input value change', state.inputValue)
			getLeads()
		}
	}, [state.inputValue])

	const getLeads = async () => {
		setLoading(true)
		// try {
		// 	const res = await searchLeadText(1, 20, state.inputValue)
		// 	const resData = res?.data?.responseData?.listObject
		// 	setLeads(resData)
		// 	console.log('res', res)
		// } catch (err) {
		// 	console.log('err', err)
		// }
		setLoading(false)
	}

	// const checkDuplicate = (value: string) => {
	// 	return state.value.some(item => item.value === value)
	// }

	const handleRemoveItem = (index: number) => {
		return () => {
			setState({
				...state,
				value: state.value.filter(
					(item: valueType, i: number) => i !== index
				),
			})
		}
	}

	// const handleBlur = (evt: TODO) => {
	// 	const { value } = evt.target

	// 	if (value !== '') {
	// 		setState({
	// 			...state,
	// 			value: [...state.value, createOption(value)],
	// 			inputValue: '',
	// 		})
	// 	}
	// }

	const createOption = (label: string, id: number) => ({
		label,
		value: label,
		id,
	})

	const handleInputChange = (evt: TODO) => {
		setState({ ...state, inputValue: evt.target.value })
	}

	const handleSelectItem = (item: TODO, id: TODO) => {
		setState({
			...state,
			value: [...state.value, createOption(item, id)],
			inputValue: '',
		})
		setVisible(false)
		// setLeads([])
	}

	// const handleInputKeyDown = (evt: TODO) => {
	// 	// if (evt.keyCode === 13) {
	// 	// 	const { value } = evt.target
	// 	// 	if (value !== '') {
	// 	// 		setState({
	// 	// 			...state,
	// 	// 			value: [...state.value, createOption(value)],
	// 	// 			inputValue: '',
	// 	// 		})
	// 	// 	}
	// 	// }
	// 	// if (evt.keyCode === 9 || evt.keyCode === 32) {
	// 	// 	evt.preventDefault()
	// 	// 	const { value } = evt.target
	// 	// 	if (value !== '') {
	// 	// 		setState({
	// 	// 			...state,
	// 	// 			value: [...state.value, createOption(value)],
	// 	// 			inputValue: '',
	// 	// 		})
	// 	// 	}
	// 	// }
	// 	// if (
	// 	// 	state.value.length &&
	// 	// 	evt.keyCode === 8 &&
	// 	// 	!state.inputValue.length
	// 	// ) {
	// 	// 	setState({
	// 	// 		...state,
	// 	// 		value: state.value.slice(0, state.value.length - 1),
	// 	// 	})
	// 	// }
	// }

	// const handleEditItem = (index: number) => {
	// 	return () => {
	// 		let it = state.value.filter(
	// 			(item: valueType, i: number) => i === index
	// 		)
	// 		setState({
	// 			...state,
	// 			value: state.value.filter(
	// 				(item: valueType, i: number) => i !== index
	// 			),
	// 			inputValue: it[0].label,
	// 		})
	// 	}
	// }

	const handleFocus = () => {
		setFocus(true)

		setTimeout(() => {
			if (inputRef.current) inputRef.current.focus()
		})
	}

	const handleBlurInput = () => {
		
		setTimeout(() => {
			if (inputRef.current) inputRef.current.blur()
		})

		setTimeout(() => {
			setFocus(false)
		}, 300)
		setState({
			...state,
			inputValue: '',
		})
	}

	const handleVisibleChange = (flag:TODO)=> {
		setVisible(flag);
	  };

	return (
		<>
			<Dropdown
			 onVisibleChange={handleVisibleChange}
				visible={visible}
				placement='bottomRight'
				overlay={
					<PopOverLeads
						leads={leads}
						handleSelectItem={handleSelectItem}
						loading={loading}
					/>
				}
				trigger={['click']}
			>
				<div
					onBlur={handleBlurInput}
					style={{ background: '#ffffff', borderRadius: '6px' }}
				>
					<InputTagWrapper
						onClick={handleFocus}
						style={{ minHeight: 32 }}
						errMessage={!focus && state.inputValue}
					>
						<label>
							<ul>
								{state.value.map(
									(item: valueType, i: number) => (
										// <div key={i} className='tag-container'>
										<TagStyled
											key={i}
											closable
											onClose={handleRemoveItem(i)}
											// onClick={handleEditItem(i)}
										>
											{item.label}
										</TagStyled>
										//  </div>
									)
								)}

								{(focus || state.value.length === 0) && (
									<InputStyled
										ref={inputRef}
										value={state.inputValue}
										onChange={handleInputChange}
										// onKeyDown={handleInputKeyDown}
										// onBlur={handleBlur}
										placeholder={
											state.value.length > 0
												? ''
												: 'Nhập tên lead'
										}
										// onFocus={handleFocus}
									/>
								)} 
							</ul>
						</label>
					</InputTagWrapper>
				</div>
			</Dropdown>
		</>
	)
}

export default InputSearchLead
const data = [
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
	'ten',
	'long long long long long',
]

const PopOverLeads = ({ leads, handleSelectItem, loading }: any) => {
	return (
		<PopOverContainer>
			<Menu>
			{/* {data.map((item: any, i: number) => (
				<Menu.Item key={i}>{item}</Menu.Item>
			))} */}
			{leads?.length > 0 && !loading ? (
				leads.map((item: any) => {
					return (
						<Menu.Item
							key={item?.id}
							onClick={() => {
								console.log('click', item.fullName)
								handleSelectItem(item.fullName, item.id)
							}}
							className='item-list'
						>
							{item.fullName}
						</Menu.Item>
					)
				})
			) : loading? <CustomSpin /> : 
				<EmptyData />
			}
			</Menu>
		</PopOverContainer>
	)
}

const InputStyled = styled.input`
	border: none;
	outline: none;
	&::placeholder {
		color: #c0c4c9;
	}
`
const TagStyled = styled(Tag)`
	&.ant-tag-hidden {
		display: inline-block !important;
	}
`

const InputTagWrapper = styled.div<TODO>`
	ul {
		margin-bottom: 0;
		padding-left: 0;
	}

	border-radius: 6px;
	border: ${props =>
		!props.errMessage ? '1px solid #d1d5db' : '1px solid #ff4d4f'};
	box-shadow: 0px 1px 2px rgb(0 0 0 / 5%);
	padding: 3.5px 8px;
	&:focus,
	&:hover,
	&:active {
		border-color: ${props => (!props.errMessage ? '#40a9ff' : 'none')};
		box-shadow: ${props =>
			!props.errMessage ? '0 0 0 2px rgb(24 144 255 / 20%)' : 'none'};
		outline: none;
	}
	&::placeholder {
		color: #c0c4c9;
	}

	.tag-container {
		display: inline-block;
		cursor: pointer;
	}

	li {
		display: inline-block;
	}
`

const ErrorStyled = styled.span`
	color: #ff4d4f !important;
	font-size: 0.8em;
`
const PopOverContainer = styled.div`
	max-height: 300px;
	/* width: 300px; */
	overflow-y: auto;

	/* .item-list {
		margin-bottom: 5px;
		&:hover {
			color: var(--primary-color);
			cursor: pointer;
			/* background: var(--border-color); */
		}
	} */
`
