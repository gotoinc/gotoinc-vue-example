import axios from 'axios'
import router from '@/router'
import env from '@/components/helpers/EnvVariables.js'

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
  register({commit}, user){
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({url: `${env.api}/register`, data: user, method: 'POST' })
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
    axios({url: `${env.api}/users/me.json`, method: 'GET' })
    .then(resp => {
      const { attributes } = resp.data.data
      commit('set_profile', attributes)
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
  }
}