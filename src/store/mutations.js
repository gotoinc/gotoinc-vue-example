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
  }
}