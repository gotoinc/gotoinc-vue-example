import errors from '@/constants/errors.js'

export default (vuelidateItemObject, name) => {
	const result = []

	if (!vuelidateItemObject.$dirty) return result

	errors[name].forEach(({ rule, message }) => {
		if(!vuelidateItemObject[rule]) {
			result.push(message)
		}
	})
	return result
}