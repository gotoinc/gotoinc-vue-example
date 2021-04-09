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
									  label="Email"
									  type="text"
									  v-model="form.email"
									  prepend-icon="mdi-account"
									  @input="handleTouch('email')"
									  @blur="handleTouch('email')"
									  :class="{
                                         'clr-error': $v.form.email.$dirty && $v.form.email.$error
                                      }"
									  :error-messages="getVuelidateError($v.form.email, 'email')"
									  required
									/>

									<!-- password -->
									<v-text-field
									  label="Password"
									  type="password"
									  v-model="form.password"
									  prepend-icon="mdi-lock"
									  @input="handleTouch('password')"
									  @blur="handleTouch('password')"
									  :class="{ 'clr-error': $v.form.password.$error }"
									  :error-messages="getVuelidateError($v.form.password, 'password')"
									  required
									/>

								</v-form>
							</v-card-text>

							<v-card-actions>
								<v-btn link text to="/register-university"
								>Register university
								</v-btn
								>
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
import getVuelidateError from "@/utils/getVuelidateError"

export default {
	name: "Login",

	components: { ErrorAlert },

	data() {
		return {
			form: {
				email: "",
				password: ""
			},
			error: ""
		};
	},

	methods: {
		getVuelidateError,

		handleTouch(field) {
			this.$v.form[field].touch()
		},

		submit(validation) {
			this.$v.$touch();

			if (validation.$invalid) {
				return false;
			}

			this.$store
			  .dispatch("login", this.form)
			  .then(() => {
				  const token = localStorage.getItem("token");
				  this.$cable.connection.connect(`${env.cable}?token=${token}`);
				  this.$router.push("/");
			  })
			  .catch(err => {
				  this.error = err;
			  });
		},

	},

	created() {
		this.$vuetify.theme.dark = false;
	},

	validations: {
		form: {
			email: {
				required,
				email
			},
			password: {
				required,
				minLength: minLength(6)
			}
		}
	}

};
</script>
