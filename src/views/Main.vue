<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Test Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn small right @click.prevent="logOut">Log out</v-btn>
    </v-app-bar>

    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="shrink">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  large
                  target="_blank"
                  v-on="on"
                  @click="testSocketMsg"
                >
                  <v-icon large>mdi-code-tags</v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; 2020 | Dimon Hamlet</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapActions } from 'vuex'
  import Channels from '@/components/mixins/Channels'

  export default {
    mixins: [Channels],
    data: () => ({
      drawer: null,
    }),
    async created () {
      this.$vuetify.theme.dark = true
      await this.loadProfile()
    },
    methods: {
      ...mapActions(['logOut', 'loadProfile', 'testSocketMsg'])
    }
  }
</script>