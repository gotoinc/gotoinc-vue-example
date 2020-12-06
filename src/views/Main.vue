<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <Menu></Menu>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title> {{ user.university ? user.university.name : '' }} - {{ mainGroup ? inPrimaryLocale(mainGroup.name) : '' }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-col :cols=1 class="locale-switch">
        <v-select
          :items="['en', 'uk']"
          :value="localeModel"
          @change="changeLocale"
        >
        </v-select>
      </v-col>
        <v-switch
          v-model="darkMode"
          :label="$t('darkMode')"
          class="switch-mode"
        ></v-switch>
      <v-btn small right @click.prevent="logOut">{{ $t('logOut') }}</v-btn>
    </v-app-bar>

    <v-main>
      <v-container
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <router-view></router-view>
        </v-row>
      </v-container>
      <notifications group="notifications" />
    </v-main>

    <v-footer app>
      <span>&copy; 2020 | Dimon Hamlet</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex'
  import Channels from '@/components/mixins/Channels'
  import Menu from '@/components/common/Menu'
  import inPrimaryLocale from '@/components/helpers/locales.js'

  export default {
    mixins: [Channels],
    components: {Menu},
    data() {
      return {
        drawer: null,
        darkMode: true,
        localeModel: 'en'
      }
    },
    created () {
      this.$vuetify.theme.dark = true
      this.loadProfile().then(attributes => {
        const locale = attributes.locale
        this.localeModel = locale
        this.$i18n.locale = locale
        this.$vuetify.lang.current = locale
      })
    },
    computed: {
      ...mapState(['locale', 'user']),
      ...mapGetters(['isUniversityAdmin', 'isGroupAdmin', 'mainGroup'])
    },
    methods: {
      ...mapActions(['logOut', 'loadProfile']),
      changeLocale(val) {
        if (this.locale !== val) {
          this.$store.dispatch('changeLocale', val).then(() => {
            this.$i18n.locale = val
            this.$vuetify.lang.current = val
            this.$store.commit('set_locale', val)
          })
        }
      },
      inPrimaryLocale(text) {
        return inPrimaryLocale(text)
      }
    },
    watch: {
      darkMode(val) {
        this.$vuetify.theme.dark = val
      }
    }
  }
</script>

<style lang="scss">
  template {
    width: 100%;
  }
  .v-list-group__items {
    padding-left: 20px;
  }
  .switch-mode {
    padding-top: 22px !important;
    padding-right: 20px;
  }
  .locale-switch {
    .v-input {
      padding-top: 15px;
    }
  }
</style>