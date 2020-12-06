<template>
  <div></div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import inPrimaryLocale from '@/components/helpers/locales.js'

export default {
  name: 'Channels',
  data() {
    return {
      check: true
    }
  },
  computed: {
    ...mapState(['user', 'conversations', 'currentConversationId']),
    ...mapGetters([])
  },
  created() {
    this.subscribeToNotification()
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
        console.log('Connected to the user channel - ', this.user.id);
      },
      received(data) {
        if (data.type === 'alert') {
          const message = inPrimaryLocale(data.message)
          this.$notify({
            group: 'notifications',
            type: 'error',
            title: 'Event alert',
            text: message
          });
        }
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
    subscribeToUser(id) {
      this.$cable.subscribe({
        channel: 'UserChannel',
        room: id
      });
    }
  },
  watch: {
    user: {
      handler(user) {
        if (!user || !this.check) return
        console.log('Trying to connect', user)
        this.check = false

        this.subscribeToUser(user.id) 
      },
      immediate: true
    }
  }
}
</script>