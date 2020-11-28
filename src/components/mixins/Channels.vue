<template>
  <div></div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Channels',
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['user', 'conversations', 'currentConversationId']),
    ...mapGetters([])
  },
  created() {
    this.subscribeToNotification()
    this.subscribeToUser() 
  },
  channels: {
    NotificationChannel: {
      connected() {
        console.log('Connected to the notification channel');
      },
      received(data) {
        console.log('NOTIFICATION CHANNEL - received', data);
      }
    },
    UserChannel: {
      connected() {
        console.log('Connected to the user channel');
      },
      received(data) {
        console.log('USER CHANNEL - received', data);
      }
    },
    ConversationChannel: {
      connected() {
        console.log('Connected to the conversation channel');
      },
      received(data) {
        console.log('CONVERSATION CHANNEL - received', data);
        const message = {
          ...data.chat_message,
          sender_id: data.sender_id
        }

        const index = this.conversations.findIndex(({id}) => id == message.conversation_id)
        this.$store.commit('add_chat_message', { message, index})
      }
    }
  },
  methods: {
    subscribeToNotification() {
      this.$cable.subscribe({
        channel: 'NotificationChannel'
      });
    },
    subscribeToUser() {
      this.$cable.subscribe({
        channel: 'UserChannel',
        room: this.user.id
      });
    }
  }
}
</script>