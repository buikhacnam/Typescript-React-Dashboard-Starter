function insertZero(num: number) {
	let n = num.toString()
	if (num < 10 && num >= 0) n = '0' + n
	return n
}

export function useToday(): { todayStart: string; todayEnd: string } {
	const today = new Date()
	const tomorrow = new Date(today)
	tomorrow.setDate(tomorrow.getDate() + 1)

	const todayStart =
		today.getFullYear() +
		'-' +
		insertZero(today.getMonth() + 1) +
		'-' +
		insertZero(today.getDate())

	const todayEnd =
		tomorrow.getFullYear() +
		'-' +
		insertZero(tomorrow.getMonth() + 1) +
		'-' +
		insertZero(tomorrow.getDate())
	return {
		todayStart,
		todayEnd,
	}
}

export function isMeetingToday(time: string): boolean {
	const fullDate = new Date(time)

	const meetingDate =
		fullDate.getFullYear() +
		'-' +
		(fullDate.getMonth() + 1) +
		'-' +
		fullDate.getDate()
	const today = new Date()
	const todayDate =
		today.getFullYear() +
		'-' +
		(today.getMonth() + 1) +
		'-' +
		today.getDate()
	const meetingIsToday = meetingDate === todayDate

	return meetingIsToday
}

export function formatDate(
	time: string,
	onlyDate = false,
): string {
	const fullDate = new Date(time)
	const hour = insertZero(fullDate.getHours())
	const minutes = insertZero(fullDate.getMinutes())
	const formatDate =
		insertZero(fullDate.getDate()) +
		'/' +
		insertZero(fullDate.getMonth() + 1) +
		'/' +
		fullDate.getFullYear()
	if (onlyDate) return formatDate
	return `${hour}:${minutes} ${formatDate}`
}

export function formatDate2(
	time: string,
	onlyDate = false,
	containsT = false
): string {
	const fullDate = new Date(time)
	const hour = insertZero(fullDate.getHours())
	const minutes = insertZero(fullDate.getMinutes())
	const seconds = insertZero(fullDate.getSeconds())
	const formatDate =
		fullDate.getFullYear() +
		'-' +
		insertZero(fullDate.getMonth() + 1) +
		'-' +
		insertZero(fullDate.getDate())

	if (onlyDate) return formatDate

	if(containsT) return `${formatDate}T${hour}:${minutes}:${seconds}.0000`
	return `${formatDate} ${hour}:${minutes}:${seconds}`
}
