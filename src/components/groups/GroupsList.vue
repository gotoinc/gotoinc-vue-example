<template>
  <v-col>
    <v-data-table
      :headers="tableHeaders"
      :items="groups"
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
  name: 'groups-list',
  data() {
    return {
      groups: [],
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
          text: this.$t('totalUsers'),
          align: 'start',
          value: 'totalUsers',
        }
      ]
    }
  },
  created() {

  },
  watch: {
    university: {
      handler(val) {
        if (!val) return

        this.$store.dispatch('getAllGroups', val.id).then(resp => {
          this.groups = resp.data.data.map(user => {
            let tmp = { ...user.attributes }
            tmp.name = inPrimaryLocale(tmp.name)
            tmp.totalUsers = tmp.group_members.length

            return tmp
          })
          this.loading = false
        })
      },
      immediate: true
    }
  }
}
</script>