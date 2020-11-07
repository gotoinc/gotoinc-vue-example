import store from '../../store'
import axios from 'axios'
import env from '@/components/helpers/EnvVariables.js'

export default function inPrimaryLocale(text) {
  const currentLocale = store.state.locale || 'en'
  return JSON.parse(text)[currentLocale]
}

export function translateText(content) {
  const currentLocale = store.state.locale || 'en'
  const to_language = currentLocale === 'en' ? 'uk' : 'en'

  const data = {
    content,
    to_language
  }

  return axios({url: `${env.api}/translate`, data: data, method: 'POST' })
    .then(resp => {
      const { text } = resp.data
      return JSON.stringify({
        [currentLocale]: content,
        [to_language]: text
      })
    })
    .catch(err => {
      console.log(err.response)
      return JSON.stringify({
        [currentLocale]: content,
        [to_language]: content,
      })
    })  
}