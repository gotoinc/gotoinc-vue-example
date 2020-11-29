export default {
  isLoggedIn(state) {
    return !!state.token
  },
  isGroupAdmin(state) {
    if (!state.user.group_members) return false
    return state.user.group_members[0].role === 'admin'
  },
  isUniversityAdmin(state) {
    return state.user.university_admin
  },
  university(state) {
    return state.user.university
  },
  currentConversation(state) {
    return state.conversations.find(({id}) => id == state.currentConversationId)
  },
  mainGroup(state) {
    if (!state.user.groups) return null
    return state.user.groups[0]
  }
  //authStatus: state => state.status
}