export default {
	login: [
		{
			rule: "required",
			message: "Login is required"
		},
		{
			rule: "email",
			message: "Invalid email"
		}
	],
	password: [
		{
			rule: "required",
			message: "Password is required"
		},
		{
			rule: "minLength",
			message: "Password is too short"
		}
	],

}