<template>
  <v-col>
    <v-data-table
      :headers="tableHeaders"
      :items="users"
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
import { mapState } from 'vuex'

export default {
  name: 'users-list',
  data() {
    return {
      users: [],
      itemsPerPage: 5,
      loading: true
    }
  },
  computed: {
    ...mapState(['locale']),
    tableHeaders() {
      return [
        {
          text: this.$t('firstName'),
          align: 'start',
          value: 'name',
        },
        {
          text: this.$t('lasttName'),
          align: 'start',
          value: 'last_name',
        },
        {
          text: this.$t('email'),
          align: 'start',
          value: 'email',
        },
        {
          text: this.$t('userGroup'),
          align: 'start',
          value: 'main_group_name',
        }
      ]
    }
  },
  created() {
    this.$store.dispatch('getAllUsers').then(resp => {
      this.users = resp.data.data.map(user => {
        let tmp = { ...user.attributes }
        if (tmp.main_group_name) {
          tmp.main_group_name = inPrimaryLocale(tmp.main_group_name)
        }
        return tmp
      })
      this.loading = false
    })
  }
}
</script>