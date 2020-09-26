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
                <v-toolbar-title>Sign up form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-account"
                    type="email"
                    v-model="form.email"
                    @input="$v.form.email.$touch()"
                    :class="{ 'clr-error': $v.form.email.$error }"
                    :error-messages="emailError($v.form.email)"
                  ></v-text-field>
                  <v-text-field
                    label="Username"
                    name="username"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="form.username"
                    @input="$v.form.username.$touch()"
                    :class="{ 'clr-error': $v.form.username.$error }"
                    :error-messages="usernameError($v.form.username)"
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
                  <v-text-field
                    id="repeat-password"
                    label="Repeat password"
                    name="repeat-password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="form.repeatPassword"
                    @input="$v.form.repeatPassword.$touch()"
                    :class="{ 'clr-error': $v.form.repeatPassword.$error }"
                    :error-messages="repeatPasswordError($v.form.repeatPassword)"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn link text to="/login">Sign in</v-btn>
                <v-spacer ></v-spacer>
                <ErrorAlert v-if="error.length" :data="error"> </ErrorAlert>
                <v-spacer ></v-spacer>
                <v-btn color="primary" @click.prevent="register($v)">Sign up</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  //import { mapActions } from 'vuex'
  import ErrorAlert from '@/components/common/ErrorAlert'
  import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'

  export default {
    components: {
      ErrorAlert
    },
    data() {
      return {
        form: {
          email: '',
          username: '',
          password: '',
          repeatPassword: ''
        },
        error: ''
      }
    },
    computed: {
    },
    validations: {
      form: {
        email: { required, email },
        username: { required, minLength: minLength(3) },
        password: { required, minLength: minLength(6) },
        repeatPassword: { 
          required,
          sameAsPassword: sameAs(function() { 
            return this.form.password
          })
        }
      }
    },
    created () {
      this.$vuetify.theme.dark = false
    },
    methods: {
      register(validation) {
        this.$v.$touch()

        if (validation.$invalid) {
				  return false
			  }

        this.$store.dispatch('register', this.form)
          .then(() => this.$router.push('/'))
          .catch(err => {
            this.error = err
          })
      },
      emailError(field) {
        if (!field.$dirty) {
          return
        } else if (!field.required) {
          return 'Email is required'
        } else if (!field.email) {
          return 'Invalid email'
        } else {
          return []
        }
      },
      usernameError(field) {
        if (!field.$dirty) {
          return
        } else if (!field.required) {
          return 'Username is required'
        } else if (!field.minLength) {
          return 'Username is too short'
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
      },
      repeatPasswordError(field) {
        if (!field.$dirty) {
          return
        } else if (!field.required) {
          return 'Repeat password'
        } else if (!field.sameAsPassword) {
          return 'Passwords do not match'
        } else {
          return []
        }
      }
    }
  }
</script>