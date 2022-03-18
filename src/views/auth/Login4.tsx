/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../redux/actions/user/userActions'
import { UserActionTypes } from '../../redux/constants/user/userConstants'
import styled from 'styled-components'
import { ExclamationCircleFilled, LockFilled } from '@ant-design/icons'
import { Spin } from 'antd'

export default function LoginPage() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [loginValue, setLoginValue] = useState({
		userName: '',
		password: '',
		remember: 'off',
	})

	const [errorInput, setErrorInput] = useState({
		userName: '',
		password: '',
	})

	const userState = useSelector((state: TODO) => state.userProfile)
	const { loading, errorMessage } = userState

	const validate = (name: string, value: string) => {
		switch (name) {
			case 'userName':
				if (!value || value.trim() === '') {
					return 'UserName is Required'
				} else {
					return ''
				}
			case 'password':
				if (!value || value.trim() === '') {
					return 'UserName is Required'
				} else {
					return ''
				}
			// if (!value) {
			//   return "Password is Required";
			// }
			// else if (value.length < 8 || value.length > 15) {
			//   return "Please fill at least 8 character";
			// } else if (!value.match(/[a-z]/g)) {
			//   return "Please enter at least lower character.";
			// } else if (!value.match(/[A-Z]/g)) {
			//   return "Please enter at least upper character.";
			// } else if (!value.match(/[0-9]/g)) {
			//   return "Please enter at least one digit.";
			// }
			// else {
			//   return "";
			// }
			default: {
				return ''
			}
		}
	}

	const handleChange = (v: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: UserActionTypes.LOGIN_CLEAR_ERROR })
		setLoginValue({
			...loginValue,
			[v.target.name]: v.target.value,
		})
		setErrorInput({
			...errorInput,
			[v.target.name]: validate(v.target.name, v.target.value),
		})
	}
	const handleSubmit = (e: any, values: TODO) => {
		e.preventDefault()
		console.log('values', values)
		const { userName, password } = values
		setErrorInput({
			userName: validate('userName', userName),
			password: validate('password', password),
		})
		dispatch({ type: UserActionTypes.LOGIN_CLEAR_ERROR })
		if (userName && password) {
			dispatch(loginUser(values, navigate))
		}
	}


	return (
		<div style={{ background: '#F9FAFB', height: '100vh' }}>
			{loading && (
				<LoadingOverlay>
					<Spin className='xoay' size='large' />
				</LoadingOverlay>
			)}
			<Wrapper>
				<Container>
					<div style={{ textAlign: 'center' }}>
						<img src='/img/lynkid.svg' alt='Workflow' />
						<h2 style={{ fontWeight: '800 !important' }}>
							Sign in to your account
						</h2>
						<p>
							Or <a href='#'>start your 14-day free trial</a>
						</p>
					</div>
					<form onSubmit={e => handleSubmit(e, loginValue)}>
						<input
							type='hidden'
							name='remember'
							defaultValue='true'
						/>
						<div>
							<div>
								<label htmlFor='email-address'>User Name</label>
								<div style={{ position: 'relative' }}>
									<input
										id='email-address'
										name='userName'
										type='text'
										autoComplete='current-username'
										placeholder='User Name'
										onChange={e => handleChange(e)}
										style={{
											border: errorInput.userName
												? '1px solid red'
												: '1px rgb(209 213 219) solid',
											color: errorMessage
												? '#7F1D1D'
												: 'black',
											borderBottom:
												errorMessage ||
												errorInput.userName
													? '2px solid #EF4444'
													: '1px rgb(209 213 219) solid',
										}}
									/>
									{(errorMessage || errorInput.userName) && (
										<ExclamationCircleFilled
											style={{
												position: 'absolute',
												right: '12px',
												top: '12px',
												color: '#EF4444',
											}}
										/>
									)}
								</div>
							</div>
							<div>
								<label htmlFor='password' className='sr-only'>
									Password
								</label>
								<div style={{ position: 'relative' }}>
									<input
										id='password'
										name='password'
										type='password'
										autoComplete='current-password'
										placeholder='Password'
										onChange={e => handleChange(e)}
										style={{
											border: errorInput.password
												? '1px solid red'
												: '1px rgb(209 213 219) solid',
											color: errorMessage
												? '#7F1D1D'
												: 'black',
										}}
									/>
									{(errorMessage || errorInput.password) && (
										<ExclamationCircleFilled
											style={{
												position: 'absolute',
												right: '12px',
												top: '12px',
												color: '#EF4444',
											}}
										/>
									)}
								</div>
							</div>
						</div>

						{(errorInput.userName || errorInput.password) && (
							<span style={{ color: 'red', fontSize: '0.7rem' }}>
								User Name hoặc Password không thể bỏ trống!
							</span>
						)}
						{errorMessage && (
							<span style={{ color: 'red', fontSize: '0.7rem' }}>
								{errorMessage}
							</span>
						)}
						<Remember>
							<div>
								<input
									id='remember-me'
									name='remember'
									type='checkbox'
									onChange={e => handleChange(e)}
								/>
								<label
									htmlFor='remember-me'
									style={{
										display: 'block',
										marginLeft: 8,
										fontSize: '0.875rem',
										lineHeight: '1.25rem',
									}}
								>
									Ghi nhớ đăng nhập
								</label>
							</div>
						</Remember>

						<div style={{ marginTop: '1.5rem' }}>
							<button type='submit'>
								<span className='lock'>
									<LockFilled />
									{/* <LockClosedIcon aria-hidden='true' /> */}
								</span>
								{loading ? 'Signing in ...' : 'Sign in'}
							</button>
						</div>
					</form>
				</Container>
			</Wrapper>
		</div>
	)
}

const LoadingOverlay = styled.div`
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 100;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	.xoay {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100%;

	img {
		height: 3rem;
		width: auto;
	}

	h2 {
		font-weight: 800;
		font-size: 1.875rem;
		line-height: 2.25rem;
		margin-top: 1.5rem;
	}

	a {
		color: rgb(79 70 229);
		font-weight: 500;
	}

	label {
		display: none;
	}

	input {
		width: 100%;
		position: relative;
		display: block;
		padding: 0.5rem 0.75rem;
		outline: none;
	}

	#email-address {
		border-radius: 8px 8px 0 0;
	}

	#password {
		border-radius: 0 0 8px 8px;
	}

	#remember-me {
		width: 1rem;
		height: 1rem;
		border-radius: 0.25rem;
	}

	button {
		position: relative;
		font-weight: 500;
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: #fff;
		padding: 0.5rem 1rem;
		background: rgb(79 70 229);
		border: 1px solid transparent;
		border-radius: 0.375rem;
		cursor: pointer;
		display: flex;
		justify-content: center;
		width: 100%;
		align-content: stretch;
	}

	button:hover {
		background: #4338ca;
	}

	.lock {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		padding-left: 0.75rem;
		padding-top: 0.5rem;
		font-size: 1.2rem;
		width: 2.5rem;
		height: 2.5rem;
		color: rgb(99 102 241);
	}
`
const Container = styled.div`
	max-width: 28rem;
	width: 100%;
`

const Remember = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 1.5rem;

	& > div {
		display: flex;
		align-items: center;
	}
`
