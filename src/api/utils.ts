import { AxiosRequestConfig } from 'axios'
import API from './index'

export const axiosCache = (
	url: string,
	cacheHour = 1,
	options?: AxiosRequestConfig
) => {
	const now = new Date().getTime()
	const getCacheUrl = localStorage.getItem(url)
	const getCacheTime = localStorage.getItem(url + '_time')

	if (getCacheUrl && getCacheTime) {
		const cache = JSON.parse(getCacheUrl)
		const cacheTime = JSON.parse(getCacheTime)

		// wait {cacheHour} hours to make a new request
		if (now - cacheTime < 1000 * 60 * 60 * cacheHour ) {
			return Promise.resolve(cache)
		} 
	}

	return API.get(url, (options = {}))
		.then(response => {
			localStorage.setItem(url, JSON.stringify(response))
			localStorage.setItem(url + '_time', JSON.stringify(now))
			return response
		})
		.catch(error => {
			return error
		})
}
