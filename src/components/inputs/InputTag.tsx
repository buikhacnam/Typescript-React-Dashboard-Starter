import React, { useState } from 'react'
import { Tag } from 'antd'
import styled from 'styled-components'

type valueType = { label: string; value: string }

type stateType = {
	value: valueType[]
	focused: boolean
	inputValue: string
}

interface Props {
	fieldName: 'email' | 'phone' | 'text'
	state: stateType
	setState: (args: any) => void
	errMessage?: string
	setErrMessage?: (args: string) => void
	style?: { [key: string]: any }
}

const TagInput: React.FC<Props> = ({
	fieldName,
	state,
	setState,
	errMessage,
	setErrMessage,
	style,
}) => {
	const [focus, setFocus] = useState(false)
	const inputRef = React.useRef<HTMLInputElement>(null)
	const isValidPhone = (mobile: string) => {
		if (setErrMessage) {
			const vnf_regex = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/g
			if (mobile !== '') {
				if (vnf_regex.test(mobile) === false || mobile.length > 10) {
					setErrMessage('Số điện thoại không hợp lệ!')
				} else if (checkDuplicate(mobile)) {
					setErrMessage('Số điện thoại đã tồn tại!')
				} else {
					setErrMessage('')
				}
			} else {
				if (!state.value.length) {
					setErrMessage('Số điện thoai không thể bỏ trống!')
				} else {
					setErrMessage('')
				}
			}
		}
	}

	const isValidEmail = (email: string) => {
		if (setErrMessage) {
			const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			if (email !== '') {
				if (email_regex.test(email) === false) {
					setErrMessage('Email không hợp lệ!')
				} else if (checkDuplicate(email)) {
					setErrMessage('Email đã tồn tại!')
				} else {
					setErrMessage('')
				}
			} else {
				setErrMessage('')
				// setErrMessage('Email không thể bỏ trống!')
			}
		}
	}

	const checkDuplicate = (value: string) => {
		return state.value.some(item => item.value === value)
	}

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

	const handleBlur = (evt: TODO) => {
		const valid = !errMessage
		if (valid) {
			const { value } = evt.target

			if (value !== '') {
				setState({
					...state,
					value: [...state.value, createOption(value)],
					inputValue: '',
				})
			}
		}
	}

	const createOption = (label: string) => ({
		label,
		value: label,
	})

	const handleInputChange = (evt: TODO) => {
		setState({ ...state, inputValue: evt.target.value })
		if (fieldName === 'phone') isValidPhone(evt.target.value)
		if (fieldName === 'email') isValidEmail(evt.target.value)
	}

	const handleInputKeyDown = (evt: TODO) => {
		const valid = !errMessage
		if (evt.keyCode === 13 && valid) {
			const { value } = evt.target

			if (value !== '') {
				setState({
					...state,
					value: [...state.value, createOption(value)],
					inputValue: '',
				})
			}
		}

		if ((evt.keyCode === 9 || evt.keyCode === 32) && valid) {
			evt.preventDefault()
			const { value } = evt.target

			if (value !== '') {
				setState({
					...state,
					value: [...state.value, createOption(value)],
					inputValue: '',
				})
			}
		}

		if (
			state.value.length &&
			evt.keyCode === 8 &&
			!state.inputValue.length
		) {
			setState({
				...state,
				value: state.value.slice(0, state.value.length - 1),
			})
		}
	}

	const handleEditItem = (index: number) => {
		return () => {
			let it = state.value.filter(
				(item: valueType, i: number) => i === index
			)
			setState({
				...state,
				value: state.value.filter(
					(item: valueType, i: number) => i !== index
				),
				inputValue: it[0].label,
			})
			if (fieldName === 'phone') isValidPhone(it[0].label)
			if (fieldName === 'email') isValidEmail(it[0].label)
		}
	}

	const handleFocus = () => {
		setFocus(true)

		setTimeout(() => {
			if (inputRef.current) inputRef.current.focus()
		})
	}

	const handleBlurInput = () => {
		setFocus(false)
		setTimeout(() => {
			if (inputRef.current) inputRef.current.blur()
		})
	}

	return (
		<div onBlur={handleBlurInput} >
			<InputTagWrapper
				onClick={handleFocus}
				errMessage={errMessage}
				style={{ minHeight: 32, ...style }}
			>
				<label>
					<ul>
						{state.value.map((item: valueType, i: number) => (
							<div key={i} className='tag-container'>
								<TagStyled
									closable
									onClose={handleRemoveItem(i)}
									onClick={handleEditItem(i)}
								>
									{item.label}
								</TagStyled>
							</div>
						))}
						{(focus || state.value.length === 0 || errMessage) && (
							<InputStyled
								ref={inputRef}
								name={fieldName}
								value={state.inputValue}
								onChange={handleInputChange}
								onKeyDown={handleInputKeyDown}
								onBlur={handleBlur}
								placeholder={
									state.value.length > 0
										? ''
										: 'Nhập thông tin'
								}
							/>
						)}
					</ul>
				</label>
			</InputTagWrapper>
			{errMessage && <ErrorStyled>{errMessage}</ErrorStyled>}
		</div>
	)
}

export default TagInput

const InputStyled = styled.input`
	border: none;
	outline: none;
	&::placeholder {
		color: #c0c4c9;
	}
`
const TagStyled = styled(Tag)`
	&.ant-tag-hidden {
		display: block !important;
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
	margin-top: 4px;
	margin-bottom: 1px;
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
	color: #ff4d4f;
	font-size: 0.8em;
`
