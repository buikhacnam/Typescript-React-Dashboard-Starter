/// <reference types="react-scripts" />
type TODO = any

declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production' | 'test'
		REACT_APP_BACKEND_URL: string
		REACT_APP_HASH: string
		REACT_APP_API_URI: string
		REACT_APP_WS_URI: string
	}
}
interface Window {
	registration: TODO
}

interface Action {
	type: string
	payload?: any
}