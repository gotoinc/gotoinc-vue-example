<template>
	<v-app id="inspire">
		<v-main>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-col cols="12" sm="8" md="4">
						<v-card class="elevation-12">

							<v-toolbar color="primary" dark flat>
								<v-toolbar-title>Sign in form</v-toolbar-title>
								<v-spacer />
							</v-toolbar>

							<v-card-text>
								<v-form>

									<!-- login -->
									<v-text-field
									  label="Login"
									  type="text"
									  v-model="form.login"
									  prepend-icon="mdi-account"
									  @input="$v.form.login.$touch()"
									  @blur="$v.form.login.$touch()"
									  :class="{ 'clr-error': $v.form.login.$dirty && $v.form.login.$error }"
									  :error-messages="loginErrors($v.form.login)"
									  required
									/>

									<!-- password -->
									<v-text-field
									  label="Password"
									  type="password"
									  v-model="form.password"
									  prepend-icon="mdi-lock"
									  @input="$v.form.password.$touch()"
									  @blur="$v.form.password.$touch()"
									  :class="{ 'clr-error': $v.form.password.$error }"
									  :error-messages="passwordErrors($v.form.password)"
									  required
									/>

								</v-form>
							</v-card-text>

							<v-card-actions>
								<v-btn link text to="/register-university">Register university</v-btn>
								<v-spacer />
								<ErrorAlert v-if="error.length" :data="error" />
								<v-spacer />
								<v-btn color="primary" @click.prevent="submit($v)">
									Sign in
								</v-btn>
							</v-card-actions>

						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import ErrorAlert from "@/components/common/ErrorAlert"
import { required, minLength, email } from "vuelidate/lib/validators"
import env from "@/components/helpers/EnvVariables.js"
import errors from '@/constants/errors.js'

export default {
	name: 'Login',

	components: { ErrorAlert },

	data() {
		return {
			form: {
				login: '',
				password: ''
			},
			error: "",
		};
	},

	methods: {

		submit(validation) {
			this.$v.$touch()

			if (validation.$invalid) {
				return false
			}

			this.$store.dispatch("login", this.form)
			  .then(() => {
				  const token = localStorage.getItem("token")
				  this.$cable.connection.connect(`${env.cable}?token=${token}`)
				  this.$router.push("/")
			  })
			  .catch(err => {
				  this.error = err
			  });
		},

		generateErrors(value, config) {
			if (!value.$dirty) return []
			return config.map(({ rule, message }) => {
				return !value[rule] ?
				  message :
				  null
			})
		},

		loginErrors(value) {
			return this.generateErrors(value, [
				...errors.login
			])
		},

		passwordErrors(value) {
			return this.generateErrors(value, [
				...errors.password
			]);
		}
	},

	created() {
		this.$vuetify.theme.dark = false
	},

	validations: {
		form: {
			login: { required, email },
			password: { required, minLength: minLength(6) }
		}
	}
}
</script>