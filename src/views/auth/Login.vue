<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Sign in form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="form.identifier"
                    @input="$v.form.identifier.$touch()"
                    :class="{ 'clr-error': $v.form.identifier.$dirty && $v.form.identifier.$error }"
                    :error-messages="loginError($v.form.identifier)"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="form.password"
                    @input="$v.form.password.$touch()"
                    :class="{ 'clr-error': $v.form.password.$error }"
                    :error-messages="passwordError($v.form.password)"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn link text to="/register-university">Register university</v-btn>
                <v-spacer ></v-spacer>
                <ErrorAlert v-if="error.length" :data="error"> </ErrorAlert>
                <v-spacer ></v-spacer>
                <v-btn color="primary" @click.prevent="login($v)">Sign in</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import ErrorAlert from '@/components/common/ErrorAlert'
  import { required, minLength, email } from 'vuelidate/lib/validators'

  export default {
    components: {
      ErrorAlert
    },
    data() {
      return {
        form: {
          identifier: '',
          password: ''
        },
        error: ''
      }
    },
    computed: {
    },
    validations: {
      form: {
        identifier: { required, email },
        password: { required, minLength: minLength(6) }
      }
    },
    created () {
      this.$vuetify.theme.dark = false
    },
    methods: {
      login(validation) {
        this.$v.$touch()

        if (validation.$invalid) {
				  return false
			  }

        this.$store.dispatch('login', this.form)
          .then(() => this.$router.push('/'))
          .catch(err => {
            this.error = err
          })
      },
      loginError(field) {
        if (!field.$dirty) {
          return
        } else if (!field.required) {
          return 'Login is required'
        } else if (!field.email) {
          return 'Invalid email'
        } else {
          return []
        }
      },
      passwordError(field) {
        if (!field.$dirty) {
          return
        } else if (!field.required) {
          return 'Password is required'
        } else if (!field.minLength) {
          return 'Password is too short'
        } else {
          return []
        }
      }
    }
  }
</script>