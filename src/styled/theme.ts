import { createGlobalStyle, DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {}

const GlobalStyle = createGlobalStyle`
	body {
		font-family: Inter, sans-serif;
	}
	:root {
		--heading-font: Poppins, sans-serif;
		--light-color: #fff;
		--warning-color: #fa541c;
		--success-color: #389e0d;
		--pastel-color: #f0f2ff;
		--border-color: #d9d9d9;
		--gray-color: #4B5563;
		--disabled-color: rgba(0, 0, 0, .25);
		--primary-color: #3B82F6;
	}

`
export default theme
export { GlobalStyle }
