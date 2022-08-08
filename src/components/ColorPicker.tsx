import { Input, Popover, Typography } from 'antd'
import React from 'react'
import { useState } from 'react'
import { SketchPicker } from 'react-color'
import styled from 'styled-components'

export default function ColorPicker({
	presentValue,
	setPresentValue,
}: {
	presentValue: string
	setPresentValue: (value: string) => void
}) {
	const [visible, setVisible] = useState(false)

	const handleChange = (e: any) => {
		if (e?.hex) {
			setPresentValue(e.hex)
		} else {
			setPresentValue(e.target.value)
		}
	}

	return (
		<Popover
			trigger='click'
			placement='left'
			visible={visible}
			onVisibleChange={_visible => {
				setVisible(_visible)
			}}
			content={
				<StyledColorPicker
					color={presentValue || 'grey'}
					onChange={handleChange}
				/>
			}
		>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '75px 1fr',
					alignItems: 'baseline',
				}}
			>
				<span className="span-text">Màu sắc:</span>
				<Input
					placeholder={'Nhập màu sắc'}
					value={presentValue}
					onChange={handleChange}
					onClick={() => setVisible(true)}
					addonAfter={
						<InputColorPicker
							value={presentValue}
							setVisible={setVisible}
							visible={visible}
						/>
					}
					allowClear={true} //
				/>
			</div>
		</Popover>
	)
}

const InputColorPicker = ({
	value,
	visible,
	setVisible,
}: {
	value: string
	visible: boolean
	setVisible: (value: boolean) => void
}) => {
	return (
		<StyledColorView
			style={{ backgroundColor: value || '#C0C0C0' }}
			onClick={() => setVisible(!visible)}
		>
			<div
				style={{
					backgroundColor: value || '#C0C0C0',
				}}
			/>
		</StyledColorView>
	)
}

export const StyledColorPicker = styled(SketchPicker)`
	box-shadow: none !important;
	padding: 0 !important;
	* > input {
		width: 100% !important;
	}
`

export const StyledColorView = styled.div`
	width: 16px;
	height: 16px;
	margin: 0 -3.5px;
	cursor: pointer;
`
