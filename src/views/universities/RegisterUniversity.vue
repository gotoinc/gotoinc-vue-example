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
                <v-toolbar-title>Register university form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Admin Email"
                    name="email"
                    prepend-icon="mdi-account"
                    type="email"
                    v-model="form.email"
                    @input="$v.form.email.$touch()"
                    :class="{ 'clr-error': $v.form.email.$error }"
                    :error-messages="emailError($v.form.email)"
                  ></v-text-field>
                  <v-text-field
                    label="Admin Name"
                    name="name"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="form.name"
                    @input="$v.form.name.$touch()"
                    :class="{ 'clr-error': $v.form.name.$error }"
                    :error-messages="nameError($v.form.name)"
                  ></v-text-field>
                  <v-text-field
                    label="Admin Last name"
                    name="last_name"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="form.last_name"
                    @input="$v.form.last_name.$touch()"
                    :class="{ 'clr-error': $v.form.last_name.$error }"
                    :error-messages="lastNameError($v.form.last_name)"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="Admin Password"
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
                    label="Repeat Admin password"
                    name="repeat-password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="form.repeatPassword"
                    @input="$v.form.repeatPassword.$touch()"
                    :class="{ 'clr-error': $v.form.repeatPassword.$error }"
                    :error-messages="repeatPasswordError($v.form.repeatPassword)"
                  ></v-text-field>
                  <v-text-field
                    label="University Name"
                    name="name"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="form.university_name"
                    @input="$v.form.university_name.$touch()"
                    :class="{ 'clr-error': $v.form.university_name.$error }"
                    :error-messages="universityNameError($v.form.university_name)"
                  ></v-text-field>
                  <v-text-field
                    label="University description"
                    name="university-description"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="form.university_description"
                    @input="$v.form.university_description.$touch()"
                    :class="{ 'clr-error': $v.form.university_description.$error }"
                    :error-messages="universityDescriptionError($v.form.university_description)"
                  ></v-text-field>
                  <v-text-field
                    label="City"
                    name="city"
                    prepend-icon="mdi-account"
                    type="email"
                    v-model="form.university_city"
                    @input="$v.form.university_city.$touch()"
                    :class="{ 'clr-error': $v.form.university_city.$error }"
                    :error-messages="universityCityError($v.form.university_city)"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn link text to="/login">Sign in</v-btn>
                <v-spacer ></v-spacer>
                <ErrorAlert v-if="error.length" :data="error"> </ErrorAlert>
                <v-spacer ></v-spacer>
                <v-btn color="primary" @click.prevent="registerUniversity($v)">Register university</v-btn>
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
  import { translateText } from '../../components/helpers/locales.js'

  //import { mapState } from 'vuex'

  export default {
    components: {
      ErrorAlert
    },
    data() {
      return {
        form: {
          email: '',
          name: '',
          last_name: '',
          password: '',
          repeatPassword: '',
          university_name: '',
          university_description: '',
          university_city: '',
        },
        error: ''
      }
    },
    computed: {
    },
    validations: {
      form: {
        email: { required, email },
        name: { required, minLength: minLength(3) },
        last_name: { required, minLength: minLength(3) },
        password: { required, minLength: minLength(6) },
        repeatPassword: { 
          required,
          sameAsPassword: sameAs(function() { 
            return this.form.password
          })
        },
        university_name: { required, minLength: minLength(3) },
        university_description: { required, minLength: minLength(3) },
        university_city: { required, minLength: minLength(3) },
      }
    },
    created () {
      this.$vuetify.theme.dark = false
    },
    methods: {
      registerUniversity(validation) {
        this.$v.$touch()

        if (validation.$invalid) {
				  return false
        }

        const dataToSend = { ...this.form }

        translateText(this.form.university_description).then(translated => {
          dataToSend.university_description = translated

          this.$store.dispatch('registerUniversity', dataToSend)
            .then(() => this.$router.push('/login'))
            .catch(err => {
              this.error = err
            })
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
      nameError(field) {
        if (!field.$dirty) {
          return
        } else if (!field.required) {
          return 'Name is required'
        } else if (!field.minLength) {
          return 'Name is too short'
        } else {
          return []
        }
      },
      lastNameError(field) {
        if (!field.$dirty) {
          return
        } else if (!field.required) {
          return 'Last name is required'
        } else if (!field.minLength) {
          return 'Last name is too short'
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
      },
      universityNameError(field) {
        if (!field.$dirty) {
          return
        } else if (!field.required) {
          return 'University name is required'
        } else if (!field.minLength) {
          return 'University name is too short'
        } else {
          return []
        }
      },
      universityDescriptionError(field) {
        if (!field.$dirty) {
          return
        } else if (!field.required) {
          return 'University description is required'
        } else if (!field.minLength) {
          return 'University description is too short'
        } else {
          return []
        }
      },
      universityCityError(field) {
        if (!field.$dirty) {
          return
        } else if (!field.required) {
          return 'University city is required'
        } else if (!field.minLength) {
          return 'University city is too short'
        } else {
          return []
        }
      },
    }
  }
</script>