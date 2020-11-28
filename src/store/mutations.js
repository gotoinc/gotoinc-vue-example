import Vue from 'vue'

export default {
  auth_request(state){
    state.status = 'loading'
  },
  auth_success(state, { token, user }){
    state.status = 'success'
    state.token = token
    state.user = user
  },
  auth_error(state){
    state.status = 'error'
  },
  logout(state){
    state.status = ''
    state.token = ''
    state.user = {}
  },
  set_profile(state, payload) {
    state.user = payload
  },
  set_groups(state, payload) {
    state.groups = payload
  },
  set_universities(state, payload) {
    state.universities = payload
  },
  set_locale(state, payload) {
    state.locale = payload
  },
  set_conversations(state, payload) {
    state.conversations = payload
  },
  set_current_conversation(state, payload) {
    state.currentConversation = payload
  },
  set_chat_messages(state, payload) {
    state.chatMessages = payload
  },
  add_chat_message(state, { message, index }) {
    const messages = state.conversations[index].chat_messages
    messages.push(message)

    state.conversations[index].chat_messages =  messages
  },
  set_current_conversation_id(state, payload) {
    Vue.set(state, 'currentConversationId', payload)
  },
  update_conversation(state, { conversation, index }) {
    state.conversations[index] = conversation
  }
}