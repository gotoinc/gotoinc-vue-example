import { mount } from '@vue/test-utils'
import generateValidateErrorMessage from "@/utils/generateValidationErrorMessage"
import errors from "@/constants/errors.js"

test('creation of error message', () => {
	expect(generateValidateErrorMessage('login',))
})