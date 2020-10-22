<template>
  <div></div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Channels',
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['user'])
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