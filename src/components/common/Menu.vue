<template>
      <v-list dense>

        <v-list-group prepend-icon="mdi-account-circle" v-if="isUniversityAdmin">
          <template slot='activator'>
              <v-list-item-title>{{ $t('users') }}</v-list-item-title>
          </template>
          <v-list-item link :to="'/users/list'">
            <v-list-item-icon>
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('allUsers') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/users/add'">
            <v-list-item-icon>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('addUser') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-group prepend-icon="mdi-certificate-outline" v-if="isUniversityAdmin">
          <template slot='activator'>
              <v-list-item-title>{{ $t('certificates') }}</v-list-item-title>
          </template>
          <v-list-item link :to="'/certificates/current'">
            <v-list-item-icon>
              <v-icon>mdi-certificate-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('currentCertificat') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-group prepend-icon="mdi-account-multiple" v-if="isUniversityAdmin">
          <template slot='activator'>
              <v-list-item-title>{{ $t('groups') }}</v-list-item-title>
          </template>
          <v-list-item link :to="'/groups/list'">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('allGroups') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/groups/add'">
            <v-list-item-icon>
              <v-icon>mdi-bank-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('addGroup') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>


        <v-list-group prepend-icon="mdi-office-building-marker" v-if="isGroupAdmin">
          <template slot='activator'>
              <v-list-item-title>{{ $t('buildings') }}</v-list-item-title>
          </template>
          <v-list-item link :to="'/buildings/list'">
            <v-list-item-icon>
              <v-icon>mdi-domain</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('allBuildings') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/buildings/add'">
            <v-list-item-icon>
              <v-icon>mdi-home-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('addBuilding') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>


        <v-list-group prepend-icon="mdi-calendar-clock">
          <template slot='activator'>
              <v-list-item-title>{{ $t('events') }}</v-list-item-title>
          </template>
          <v-list-item link :to="'/events/calendar'" >
            <v-list-item-icon>
              <v-icon>mdi-calendar-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('eventsCalendar') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/events/list'" >
            <v-list-item-icon>
              <v-icon>mdi-calendar-month</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('allEvents') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/events/add'"  v-if="isGroupAdmin">
            <v-list-item-icon>
              <v-icon>mdi-calendar-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('addEvent') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-group prepend-icon="mdi-chat-processing">
          <template slot='activator'>
              <v-list-item-title>{{ $t('conversations') }}</v-list-item-title>
          </template>
          <v-list-item link :to="'/conversations/new'" >
            <v-list-item-icon>
              <v-icon>mdi-chat-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('newConversation') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link :to="'/conversations/my'" >
            <v-list-item-icon>
              <v-icon>mdi-chat</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('myConversations') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

      </v-list>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Menu',
    computed: {
      ...mapGetters(['isUniversityAdmin', 'isGroupAdmin'])
    }
  }
</script>

<style lang="scss">

</style>