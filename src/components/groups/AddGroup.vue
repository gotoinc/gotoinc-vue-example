<template>
          <v-col :cols=6>    
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>{{ $t('createGroup') }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    :label="$t('name')"
                    name="name"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="form.name"
                    @input="$v.form.name.$touch()"
                    :class="{ 'clr-error': $v.form.name.$error }"
                    :error-messages="nameError($v.form.name)"
                  ></v-text-field>
                  <v-select
                    v-model="form.admin_id"
                    :items="users"
                    :label="$t('selectAdmin')"
                    item-text="full_name"
                    item-value="id"
                    @input="$v.form.admin_id.$touch()"
                    :class="{ 'clr-error': $v.form.admin_id.$error }"
                    :error-messages="adminError($v.form.admin_id)"
                  >
                  </v-select>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer ></v-spacer>
                <ErrorAlert v-if="error.length" :data="error"> </ErrorAlert>
                <v-spacer ></v-spacer>
                <v-btn color="primary" @click.prevent="createGroup($v)">{{ $t('create') }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
</template>

<script>
  //import { mapActions } from 'vuex'
  import ErrorAlert from '@/components/common/ErrorAlert'
  import { required, minLength, email } from 'vuelidate/lib/validators'
  import { mapGetters } from 'vuex'
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
          admin_id: null,
        },
        error: '',
        users: []
      }
    },
    computed: {
      ...mapGetters(['university'])
    },
    validations: {
      form: {
        name: { required, minLength: minLength(3) },
        admin_id: { required }
      }
    },
    created () {
      this.$store.dispatch('getAllUsers').then(resp => {
        this.users = resp.data.data.map(user => user.attributes).filter(user => !user.main_group_name)
      })
    },
    methods: {
      createGroup(validation) {
        this.$v.$touch()

        if (validation.$invalid) {
				  return false
        }
        translateText(this.form.name).then(translated => {
          const group = this.form
          group.name = translated

          this.$store.dispatch('createGroup', { group, universityId: this.university.id })
            .then(() => this.$router.push('/'))
            .catch(err => {
              this.error = err
            })
        })
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
      adminError(field) {
        if (!field.$dirty) {
          return
        } else if (!field.required) {
          return 'Admin is required'
        } else {
          return []
        }
      }
    }
  }
</script>
