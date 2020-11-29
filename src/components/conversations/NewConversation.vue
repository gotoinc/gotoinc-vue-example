<template>
      <v-col :cols=6>
            <v-card>
              <v-subheader>{{ $t('newConversation') }}</v-subheader>
              <v-row>
                <v-col :cols=9>
                  <v-text-field
                    class="search-user"
                    :label="$t('searchByName')"
                    hide-details="auto"
                    v-model="inputModel"
                    @keypress.enter="searchUsers"
                  ></v-text-field>  
                </v-col>
                <v-col :cols=3>
                  <v-btn color="primary mt-3" @click="searchUsers">
                    {{ $t('search') }}
                  </v-btn>   
                </v-col>
              </v-row>
              <v-list two-line>
                <template
                  v-for="(user, index) in users"
                >
                  <v-list-item
                    :key="user.id"
                    
                  >
                    <v-list-item-avatar color="grey darken-1">
                      {{ user.full_name[0] }}
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{ user.full_name }}</v-list-item-title>
                    </v-list-item-content>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            :dark="$vuetify.theme.dark"
                            icon
                            v-bind="attrs"
                            @click="createConversation(user.id)"
                            v-on="on"
                          >
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ $t('createConversationWith') + ` ${user.full_name}` }} </span>
                      </v-tooltip>
                  </v-list-item>

                  <v-divider
                    :key="`divider-${user.id}`"
                    v-if="index < users.length - 1"
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
      </v-col>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'new-conversation',
  data() {
    return {
      users: [],
      inputModel: '',
      alreadyCreatedConversationWithUsers: []
    }
  },
  created() {
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['mainGroup']),
    group() {
      return this.mainGroup
    }
  },
  methods: {
    getUsers(groupId) {
      this.$store.dispatch('getGroupUsers', groupId)
        .then(resp => {
          let users = resp.data.data.map(user => user.attributes)
          console.log(this.alreadyCreatedConversationWithUsers)
          users = users.filter(user => user.id != this.user.id && !this.alreadyCreatedConversationWithUsers.includes(user.id))
          this.users = users
          this.allUsers = users
        })
    },
    searchUsers() {
      this.users = this.allUsers.filter(user => user.full_name.toLowerCase().includes(this.inputModel.toLowerCase()))
    },
    createConversation(userId) {
      this.$store.dispatch('createConversation', userId)
        .then(resp => {
          const conversationId = resp.data.data.id

          this.$router.push(`/conversations/my/${conversationId}`)
        })
    }
  },
  watch: {
    group: {
      handler(group) {
        if (!group) return

        if (this.alreadyCreatedConversationWithUsers.length) {
          this.getUsers(group.id)
        } else {
          this.$store.dispatch('getAllConversations')
            .then(conversations => {
              this.alreadyCreatedConversationWithUsers = conversations.map(({partner}) => partner.id)
              this.getUsers(group.id)
            })
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
  .search-user {
    padding-left: 15px;
  }
</style>