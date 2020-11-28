<template>
  <v-col class="pb-0 pt-0">
    <v-row class="all-chats"> 
      <v-col :cols=4>
            <v-card>
              <v-subheader>{{ $t('allConversations') }}</v-subheader>

              <v-list two-line>
                <template
                  v-for="(conversation, index) in conversations"
                >
                  <v-list-item
                    :key="conversation.id"
                    link
                    :to="`/conversations/my/${conversation.id}`"
                  >
                    <v-list-item-avatar color="grey darken-1">
                      {{ conversation.partner.full_name[0] }}
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{ conversation.partner.full_name }}</v-list-item-title>

                      <v-list-item-subtitle
                        v-if="conversation.chat_messages.length"
                      >
                        {{ conversation.chat_messages[conversation.chat_messages.length - 1].content }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle
                        v-else
                      >
                        {{ $t('empty') }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                    :key="`divider-${conversation.id}`"
                    v-if="index < conversations.length - 1"
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
      </v-col>
      <v-col :cols=8>
        <router-view></router-view>
      </v-col>
    </v-row>  
  </v-col>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'all-conversations',
    created() {
      this.$store.dispatch('getAllConversations')
        .then(conversations => {
          this.subscribeToConversations(conversations)
        })
    },
    computed: {
      ...mapState(['conversations'])
    },
    methods: {
      subscribeToConversations(conversations) {
        this.conversations.forEach(conv => {
          this.$cable.subscribe({
            channel: 'ConversationChannel',
            room: conv.id
          })
        })
      }
    }
  }
</script>

<style lang="scss">
  .all-chats {
    height: calc(100vh - 125px);
  }
  .pb-0 {
    padding-bottom: 0 !important;
  }
  .pt-0 {
    padding-top: 0 !important;
  }
</style>