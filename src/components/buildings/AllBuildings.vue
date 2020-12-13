<template>
  <v-col>
    <v-data-table
      :headers="tableHeaders"
      :items="buildings"
      :items-per-page="itemsPerPage"
      class="elevation-1"
      :loading="loading"
      :locale="locale"
    >
    </v-data-table>
  </v-col>
</template>

<script>
import inPrimaryLocale from '../helpers/locales'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'buildings-list',
  data() {
    return {
      buildings: [],
      itemsPerPage: 5,
      loading: true
    }
  },
  computed: {
    ...mapState(['locale']),
    ...mapGetters(['university']),
    tableHeaders() {
      return [
        {
          text: this.$t('id'),
          align: 'start',
          value: 'id',
        },
        {
          text: this.$t('name'),
          align: 'start',
          value: 'name',
        },
        {
          text: this.$t('description'),
          align: 'start',
          value: 'description',
        },
        {
          text: this.$t('location'),
          align: 'start',
          value: 'location',
        },
        {
          text: `${this.$t('area')} ${this.locale === 'en' ? 'ft²' : 'm²'}`,
          align: 'start',
          value: 'area',
        },
        {
          text: this.$t('availableTime'),
          align: 'start',
          value: 'availableTime',
        },
      ]
    }
  },
  created() {

  },
  watch: {
    university: {
      handler(val) {
        if (!val) return

        this.loading  = true
        this.$store.dispatch('getAllBuildings', val.id).then(buildings => {
          this.buildings = buildings
          this.loading = false
        })
      },
      immediate: true
    },
    locale() {
        if (!this.university) return

        this.loading = true
        this.$store.dispatch('getAllBuildings', this.university.id).then(buildings => {
          this.buildings = buildings
          this.loading = false
        })
    }
  }
}
</script>