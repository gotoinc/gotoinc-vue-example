<template>
  <v-card class="chat-window">
    <div class="chat-messages" v-chat-scroll v-if="currentConversation">
      <v-snackbar
        v-for="message in currentConversation.chat_messages"
        :key="message.id"
        :timeout="-1"
        :value="true"
        color="blue-grey"
        :left="message.sender_id !== user.id"
        :right="message.sender_id == user.id"
        shaped
      >
        {{ message.content }}
      </v-snackbar>
    </div>
    <template>
      <v-divider></v-divider>
      <v-row>
        <v-col :cols="9">
          <v-text-field
            class="message-input"
            :label="$t('typeMessage')"
            hide-details="auto"
            v-model="inputModel"
            @keypress.enter="sendMessage"
          ></v-text-field>
        </v-col>
        <v-col :cols="3">
          <v-btn color="primary mt-3" @click="sendMessage">
            {{ $t("send") }}
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "single-conversation",
  data() {
    return {
      inputModel: ""
    };
  },
  created() {
    //this.$store.dispatch('getAndSetSingleConversation', this.$route.params.id)
    this.$store.commit("set_current_conversation_id", this.$route.params.id);
  },
  computed: {
    ...mapState(["user", "currentConversationId"]),
    ...mapGetters(["currentConversation"]),
    conversationId() {
      return this.$route.params.id;
    }
  },
  methods: {
    sendMessage() {
      if (!this.inputModel) return;
      this.$cable.perform({
        channel: "ConversationChannel",
        room: this.currentConversationId,
        action: "send_message",
        data: {
          conversation_id: this.currentConversationId,
          content: this.inputModel
        }
      });
      this.inputModel = "";
    }
  },
  watch: {
    conversationId(id) {
      this.$store.commit("set_current_conversation_id", id);
      // this.$store.dispatch('getSingleConversation', id)
      // console.log(this.currentConversation)
    }
  }
};
</script>
<style lang="scss">
.v-snack {
  padding-bottom: 0px !important;
  padding-top: 15px !important;
  height: unset !important;
  position: relative !important;
}
.v-snack__wrapper {
  min-width: 100px !important;
}
.chat-window {
  height: 100% !important;
}
.message-input {
  margin-left: 20px;
}
.chat-messages {
  height: 500px;
  overflow-y: scroll;
}
</style>
