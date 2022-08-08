import { useState, useEffect } from 'react'
interface Size {
	width: number
	height: number
}
const useWindowSize = (): Size => {
	const win = window
	const doc = document
	const docElem = doc.documentElement
	const body = doc.getElementsByTagName('body')[0]
	const [windowSize, setWindowSize] = useState<Size>({
		width: win.innerWidth || docElem.clientWidth || body.clientWidth,
		height: win.innerWidth || docElem.clientWidth || body.clientWidth,
	})
	useEffect(() => {
		// Handler to call on window resize
		function handleResize() {
			// Set window width/height to state
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}
		// Add event listener
		window.addEventListener('resize', handleResize)
		// Call handler right away so state gets updated with initial window size
		handleResize()
		// Remove event listener on cleanup
		return () => window.removeEventListener('resize', handleResize)
	}, []) // Empty array ensures that effect is only run on mount
	return windowSize
}

export default useWindowSize
