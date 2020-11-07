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
                <v-toolbar-title>Create group form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Name"
                    name="name"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="form.name"
                    @input="$v.form.name.$touch()"
                    :class="{ 'clr-error': $v.form.name.$error }"
                    :error-messages="nameError($v.form.name)"
                  ></v-text-field>
                  <v-text-field
                    label="Admin email"
                    name="email"
                    prepend-icon="mdi-account"
                    type="email"
                    v-model="form.admin_email"
                    @input="$v.form.admin_email.$touch()"
                    :class="{ 'clr-error': $v.form.admin_email.$error }"
                    :error-messages="emailError($v.form.admin_email)"
                  ></v-text-field>
                  <v-select
                    v-model="form.university_id"
                    :items="universities"
                    label="Select University"
                    item-text="name"
                    item-value="id"
                    @input="$v.form.university_id.$touch()"
                    :class="{ 'clr-error': $v.form.university_id.$error }"
                    :error-messages="univerrsityError($v.form.university_id)"
                  >
                  </v-select>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn link text to="/login">Sign in</v-btn>
                <v-btn link text to="/register">Sign up</v-btn>
                <v-spacer ></v-spacer>
                <ErrorAlert v-if="error.length" :data="error"> </ErrorAlert>
                <v-spacer ></v-spacer>
                <v-btn color="primary" @click.prevent="createGroup($v)">Create group</v-btn>
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
  import { required, minLength, email } from 'vuelidate/lib/validators'
  import { mapState } from 'vuex'
  import { translateText } from '../../components/helpers/locales.js'

  export default {
    components: {
      ErrorAlert
    },
    data() {
      return {
        form: {
          admin_email: '',
          name: '',
          university_id: null
        },
        error: ''
      }
    },
    computed: {
      ...mapState(['universities'])
    },
    validations: {
      form: {
        admin_email: { required, email },
        name: { required, minLength: minLength(3) },
        university_id: { required }
      }
    },
    created () {
      this.$vuetify.theme.dark = false
      this.$store.dispatch('getUniversities')
    },
    methods: {
      createGroup(validation) {
        this.$v.$touch()

        if (validation.$invalid) {
				  return false
        }
        translateText(this.form.name).then(translated => {
          const dataToSend = this.form
          dataToSend.name = translated

          this.$store.dispatch('createGroup', dataToSend)
            .then(() => this.$router.push('/register'))
            .catch(err => {
              this.error = err
            })
        })
      },
      emailError(field) {
        if (!field.$dirty) {
          return
        } else if (!field.required) {
          return 'Admin Email is required'
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
      univerrsityError(field) {
        if (!field.$dirty) {
          return
        } else if (!field.required) {
          return 'University is required'
        } else {
          return []
        }
      }
    }
  }
</script>