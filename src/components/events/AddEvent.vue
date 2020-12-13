<template>
  <v-col :cols=8>
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>{{ $t('createEvent') }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    :label="$t('name')"
                    name="name"
                    prepend-icon="mdi-rename-box"
                    type="text"
                    v-model="form.name"
                    @input="$v.form.name.$touch()"
                    :class="{ 'clr-error': $v.form.name.$error }"
                    :error-messages="nameError($v.form.name)"
                  ></v-text-field>
                  <v-textarea
                    :label="$t('description')"
                    name="description"
                    prepend-icon="mdi-card-text-outline"
                    v-model="form.description"
                    @input="$v.form.description.$touch()"
                    :class="{ 'clr-error': $v.form.description.$error }"
                    :error-messages="descriptionError($v.form.description)"
                  ></v-textarea>
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.date"
                        :label="$t('selectDate')"
                        prepend-icon="mdi-calendar"
                        readonly
                        @input="$v.form.date.$touch()"
                        :class="{ 'clr-error': $v.form.date.$error }"
                        :error-messages="dateError($v.form.date)"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.date"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                      >
                        {{ $t('cancel') }}
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                      >
                        {{ $t('ok') }}
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                  <v-select
                    v-model="form.building_id"
                    :items="buildings"
                    prepend-icon="mdi-office-building-marker"
                    :label="$t('selectBuilding')"
                    item-text="name"
                    item-value="id"
                    @input="$v.form.building_id.$touch()"
                  >
                  </v-select>
                  <v-row v-if="form.building_id">
                    <v-col>
                      <h2>{{ $t('startTime') }}:</h2>
                      <v-time-picker
                        v-model="form.date_from"
                        full-width
                        :format="locale === 'en' ? 'ampm' : '24hr' "
                        @input="$v.form.date_from.$touch()"
                      ></v-time-picker>
                      <span
                        v-if="$v.form.date_from.$error"
                        class="error-time"
                      >
                        {{ dateFromError($v.form.date_from) }}
                      </span>
                    </v-col>
                    <v-col>
                      <h2>{{ $t('endTime') }}:</h2>
                      <v-time-picker
                        v-model="form.date_to"
                        full-width
                        :format="locale === 'en' ? 'ampm' : '24hr' "
                        @input="$v.form.date_to.$touch()"
                      ></v-time-picker>
                      <span
                        v-if="$v.form.date_to.$error"
                        class="error-time"
                      >
                        {{ dateFromError($v.form.date_to) }}
                      </span>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer ></v-spacer>
                <ErrorAlert style="margin-bottom: 10px !important;" v-if="errors.length" :dataArray="errors"> </ErrorAlert>
                <v-spacer ></v-spacer>
                <v-btn color="primary" @click.prevent="createEvent($v)">{{ $t('create') }}</v-btn>
              </v-card-actions>
            </v-card>
  </v-col>
</template>

<script>
  //import { mapActions } from 'vuex'
  import ErrorAlert from '@/components/common/ErrorAlert'
  import { required, minLength, requiredIf } from 'vuelidate/lib/validators'
  import { mapState, mapGetters } from 'vuex'
  import moment from 'moment'
  import { translateText } from '../../components/helpers/locales.js'

  export default {
    components: {
      ErrorAlert
    },
    data() {
      return {
        form: {
          name: '',
          description: '',
          date: '',
          building_id: '',
          date_from: '',
          date_to: null
        },
        buildings: [],
        menu: '',
        errors: [],
        date() {
          return moment().lang(this.locale).format('LT')
        }
      }
    },
    computed: {
      ...mapState(['locale']),
      ...mapGetters(['university'])
    },
    validations: {
      form: {
        name: { required, minLength: minLength(3) },
        description: { required, minLength: minLength(3) },
        date: { required },
        date_from: { required: requiredIf(function () {
          return !!this.form.building_id
          })
        },
        date_to: { required: requiredIf(function () {
          return !!this.form.building_id
          })
        },
        building_id: { }
      }
    },
    watch: {
      university: {
        handler(val) {
          if (val) {
            if (!val) return

            this.$store.dispatch('getAllBuildings', val.id)
              .then(buildings => {
              this.buildings = buildings
          })
          }
        },
        deep: true,
        immediate: true
      },
      locale() {
        this.$store.dispatch('getAllBuildings', this.university.id)
          .then(buildings => {
            this.buildings = buildings
          })
      }
    },
    methods: {
      createEvent(validation) {
        this.$v.$touch()

        if (validation.$invalid) {
				  return false
        }
        const date = this.form.date.split('-')
        const formData = {
          date: `${date[2]}.${date[1]}.${date[0]}`,
          date_from: '',
          date_to: ''
        }

        if (this.form.building_id) {
          formData.building_id = this.form.building_id
          formData.date_from = `${formData.date}-${this.form.date_from}:00`,
          formData.date_to = `${formData.date}-${this.form.date_to}:00`
        }

        const translateName = translateText(this.form.name).then(translated => formData.name = translated)
        const translateDescription = translateText(this.form.description).then(translated => formData.description = translated)

        Promise.all([translateName, translateDescription])
          .then(() => {
            this.$store.dispatch('createEvent', formData)
              .then(() => this.$router.push('/events/list'))
              .catch(err => {
                this.errors = err.response.data.error.message.split(',')
              })
            console.log('done', formData)
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
      descriptionError(field) {
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
      dateError(field) {
        if (!field.$dirty) {
          return
        } else if (!field.required) {
          return 'Date is required'
        } else {
          return []
        }
      },
      dateFromError(field) {
        if (!field.$dirty) {
          return
        } else if (!field.required) {
          return 'Start time is required'
        } else {
          return []
        }
      },
      dateToError(field) {
        if (!field.$dirty) {
          return
        } else if (!field.required) {
          return 'End time is required'
        } else {
          return []
        }
      }
    }
  }
</script>

<style lang="scss">
  .error-time {
    color: #ff5252;
    padding-top: 10px;
    display: block;
  }
</style>