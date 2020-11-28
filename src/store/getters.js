export default {
  isLoggedIn(state) {
    return !!state.token
  },
  isGroupAdmin(state) {
    return true //state.user.group
  },
  isUniversityAdmin(state) {
    return state.user.university_admin
  },
  university(state) {
    return state.user.university
  },
  currentConversation(state) {
    return state.conversations.find(({id}) => id == state.currentConversationId)
  }
  //authStatus: state => state.status
}