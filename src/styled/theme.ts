import { createGlobalStyle } from 'styled-components'

export const lightTheme = {
	body: '#FFFFFF',
	text: '#363537',
	toggleBorder: '#FFF',
	background: '#363537',
	layoutBackground: '#f0f2f5',
	siderBackground: '#ffffff',
	selectedMenuItem: '#e6f7ff',
	overlayBackground: 'rgba(0, 0, 0)',
	quillBackground: '#FFFFFF',
}
export const darkTheme = {
	body: '#15202B',
	text: '#F7F9F9',
	toggleBorder: '#6B8096',
	background: '#15202B',
	layoutBackground: '#15202B',
	siderBackground: 'rgb(30, 39, 50)',
	selectedMenuItem: '#303a43',
	overlayBackground: 'rgba(255, 255, 255)',
	quillBackground: '#7a7a7a',
}

type Themes = {
	darkTheme: typeof darkTheme
	lightTheme: typeof lightTheme
}

export const theme: Themes = {
	lightTheme,
	darkTheme,
}

export type ThemeType = keyof Themes


const GlobalStyle = createGlobalStyle`

	h1.ant-typography, h2.ant-typography, h3.ant-typography, h4.ant-typography, h5.ant-typography, h6.ant-typography, .ant-typography {
			color: unset;
		}

	body {
		font-family: Inter, sans-serif;
		overflow: hidden;
		background: ${({ theme }: TODO) => theme.body};
		color: ${({ theme }) => theme.text};
		transition: all 1.50s linear;
	}

	:root {
		/* --heading-font: Poppins, sans-serif; */
		--light-color: #fff;
		--warning-color: #fa541c;
		--success-color: #389e0d;
		--pastel-color: #f0f2ff;
		--border-color: #d9d9d9;
		--gray-color: #4B5563;
		--disabled-color: rgba(0, 0, 0, .25);
		--primary-color: #1890FF;
	}

	.ant-comment-content-author-time, .ant-card-meta-description, .ant-card-actions .anticon  {
    	color: #938f8f;
	}

	.ant-table-tbody > tr.ant-table-row:hover > td, .ant-dropdown-open td {
    	background: none;
	}

	.ant-radio-disabled+span {
		color: unset;
	}
	
	.ant-modal-confirm-body .ant-modal-confirm-title, .ant-modal-confirm-body .ant-modal-confirm-content, .ant-pagination-item a, .ant-radio-wrapper, .span-text, .ant-pagination-total-text, .ant-form-item-label>label, p, .ant-comment-actions>li>span, .ant-checkbox-wrapper, h1, h2, h3, h4, h5, h6, .ant-card-meta-title, .ant-comment-content-author-name>*, .ant-comment-content-author-name>:hover, .ant-upload-list{
		color: ${({ theme }) => theme.text};
		transition: all 0.50s linear;
	}
	
	.ant-input, .ant-input-affix-wrapper, input, .ant-select:not(.ant-select-customize-input) .ant-select-selector, .ant-picker, .ant-picker-input>input {
		background: ${({ theme }: TODO) => theme.siderBackground};
   		color: ${({ theme }) => theme.text};
		transition: all 0.50s linear;
	}


	.ant-layout, .custom-popup-container, .ant-drawer-content, .ant-drawer-body, .ant-drawer-wrapper-body {
		background: ${({ theme }: TODO) => theme.layoutBackground};
		color: ${({ theme }) => theme.text};
		transition: all 0.50s linear;
	}


	.ant-menu-sub.ant-menu-inline,
	aside,
	.ant-menu,
	.ant-menu-submenu-arrow,
	.ant-layout-sider,
	.ant-layout-sider-trigger,
	.ant-layout-header,
	.ant-menu-submenu-popup>.ant-menu,
	.ant-table,
	.ant-table-cell-fix-left, .ant-table-cell-fix-right, .ant-table-thead>tr>th, .ant-table-small .ant-table-thead>tr>th,
	.card.post, .ant-card, .ant-modal-content, .ant-card-actions, .banner-drag 
	 {
		background: ${({ theme }: TODO) => theme.siderBackground};
   		color: ${({ theme }) => theme.text};
    	transition: all 0.50s linear;

	}

	.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
		background: ${({ theme }: TODO) => theme.selectedMenuItem};
		transition: all 0.50s linear;
	}
	.custom-popup-overlay {
		background: ${({ theme }: TODO) => theme.overlayBackground};
		transition: all 0.50s linear;
	}

	.ant-select-multiple .ant-select-selection-item {
		color: black !important;
	}

	.ant-table-tbody>tr.ant-table-row-selected>td {
		background: #e6f7ff52 ;
	}

	.quill-wrapper-custom {
		background: ${({ theme }: TODO) => theme.quillBackground};
	}



`
export default theme
export { GlobalStyle }
