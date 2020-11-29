import axios from 'axios'
import router from '@/router'
import env from '@/components/helpers/EnvVariables.js'
import inPrimaryLocale from '../components/helpers/locales.js'

export default {
  login({commit}, credentials) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({url: `${env.api}/login`, data: credentials, method: 'POST' })
        .then(resp => {
          const token = resp.data.meta.token
          const user = resp.data.data.attributes
          localStorage.setItem('token', token)

          axios.defaults.headers.common['Authorization'] = token

          commit('auth_success', { token, user })
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err.response.data.error.message)
        })
    })
  },
  register({commit, getters}, user){
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({url: `${env.api}/universities/${getters.university.id}/register_user`, data: user, method: 'POST' })
        .then(resp => {
           resolve(resp)
        })
        .catch(err => {
          console.log(err.response)
          let key = Object.keys(err.response.data)[0]
          let msg = key + " " + err.response.data[key][0]
          reject(msg)
        })
      })
  },
  logOut({ commit }) {
    localStorage.removeItem('token')
    commit('logout')
    router.push('/login')
  },
  loadProfile({ commit }) {
    return axios({url: `${env.api}/users/me.json`, method: 'GET' })
    .then(resp => {
      const { attributes } = resp.data.data
      commit('set_profile', attributes)
      commit('set_locale', attributes.locale)
      return attributes
    })
    .catch((error) => {
      console.log(error)
    })
  },
  testSocketMsg({ state }) {
    this.$cable.perform({
      channel: 'UserChannel',
      room: state.user.id,
      action: 'say_hello',
      data: {
        content: 'Dima'
      }
    });
  },
  getGroups({ commit }, universityId) {
    axios({url: `${env.api}/universities/${universityId}/groups.json`, method: 'GET' })
    .then(resp => {
      const { data }  = resp.data
      const filteredGroups = data.map(group => ({
                          name: inPrimaryLocale(group.attributes.name),
                          id: group.attributes.id
                        }))
      commit('set_groups', filteredGroups)
    })
    .catch(err => {
      console.log(err.response)
    })
  },
  getUniversities({ commit }) {
    axios({url: `${env.api}/universities.json`, method: 'GET' })
    .then(resp => {
      const { data }  = resp.data
      const filteredUniversities = data.map(group => ({
                          name: group.attributes.name,
                          id: group.attributes.id
                        }))
      commit('set_universities', filteredUniversities)
    })
    .catch(err => {
      console.log(err.response)
    })
  },
  getAllUsers() {
    return axios({url: `${env.api}/users.json`, method: 'GET' })
  },
  registerUniversity(_, university) {
    return axios({url: `${env.api}/universities_non_auth`, data: university, method: 'POST' })
  },
  createGroup(_, { group, universityId }) {
    return axios({url: `${env.api}/universities/${universityId}/groups`, data: group, method: 'POST' })
  },
  changeLocale(_, locale) {
    return axios({url: `${env.api}/users/locale`, data: {locale}, method: 'PUT' })
  },
  getAllEvents() {
    return axios({url: `${env.api}/events/search.json`, method: 'GET' })
  },
  searchEvents(_, { s, university_id }) {
    return axios({url: `${env.api}/events/search.json?s=${s}&university_id=${university_id}`, method: 'GET' })
  },
  willAttend(_, eventId) {
    return axios({url: `${env.api}/events/${eventId}/attend.json`, method: 'POST' })
  },
  getAllConversations({ state, commit }) {
    return axios({url: `${env.api}/conversations.json`, method: 'GET' })
      .then(resp => {
        const conversations = resp.data.data.map(conv => {
          let tmp = conv.attributes
          tmp.partner = tmp.users.find(({data}) => data.id != state.user.id).data.attributes
          tmp.chat_messages = tmp.chat_messages.map(message => message.data.attributes)
          return tmp
        })
        commit('set_conversations', conversations)
        return conversations
      })
  },
  getSingleConversation({ state, commit }, conversationId) {
    axios({url: `${env.api}/conversations/${conversationId}.json`, method: 'GET' })
      .then(resp => {
        let conversation = resp.data.data.attributes
        conversation.partner = conversation.users.find(({data}) => data.id != state.user.id).data.attributes
        conversation.chat_messages = conversation.chat_messages.map(tmp => tmp.data.attributes)

        const index = state.conversations.findIndex(({id}) => id == conversation.id)
        commit('update_conversation', { conversation, index })
      })
  },
  getGroupUsers(_, groupId) {
    return axios({url: `${env.api}/users.json?group_id=${groupId}`, method: 'GET' })
  },
  createConversation(_, userId) {
    return axios({url: `${env.api}/conversations`, data: {user_id: userId}, method: 'POST' })
  }
}