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

export const messages = {
  en: {
    create: "Create",
    logOut: "Log out",
    darkMode: "Dark mode",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    password: "Password",
    repeatPassword: "Pepeat password",
    userGroup: "User group",
    rowsPerPage: "Rows per page",
    addUser: "Add user",
    selectGroup: "Select group",
    add: "Add",
    name: "Name",
    selectAdmin: "Select Admin",
    createGroup: "Create group",
    users: "Users",
    allUsers: "All users",
    addUser: "Add user",
    groups: "Groups",
    allGroups: "All groups",
    addGroup: "Add group",
    buildings: "Buildings",
    allBuildings: "All buildings",
    addBuilding: "Add building",
    events: 'Events',
    allEvents: "All events",
    addEvent: "Add event",
    eventsCalendar: "Calendar",
    day: "Day",
    week: "Week",
    month: "Month",
    today: "Today",
    cancel: "Cancel",
    willAttend: "Will attend",
    description: "Description",
    totalParticipants: "Total participants",
    conversations: "Conversations",
    newConversation: "New Conversation",
    myConversations: "My conversations",
    allConversations: "All conversations",
    empty: "empty",
    send: "send",
    typeMessage: "Type message",
    search: "Search",
    searchPhrase: "Search phrase",
    university: "University"
  },
  uk: {
    create: "Створити",
    logOut: "Вийти",
    darkMode: "Темна тема",
    firstName: "Ім'я",
    lastName: "Прізвище",
    email: "Пошта",
    password: "Пароль",
    repeatPassword: "Підтвердіть пароль",
    userGroup: "Групи користувача",
    rowsPerPage: "Рядків на сторінку",
    addUser: "Додати користувача",
    selectGroup: "Виберіть групу",
    add: "Додати",
    name: "Назва",
    selectAdmin: "Виберіть адміністратора",
    createGroup: "Створити групу",
    users: "Користувачі",
    allUsers: "Всі користувачі",
    addUser: "Додати користувача",
    groups: "Групи",
    allGroups: "Всі групи",
    addGroup: "Додати групу",
    buildings: "Приміщення",
    allBuildings: "Всі приміщення",
    addBuilding: "Додати приміщення",
    events: 'Заходи',
    allEvents: "Всі заходи",
    addEvent: "Додати захід",
    eventsCalendar: "Календар",
    day: "День",
    week: "Неділя",
    month: "Місяць",
    today: "Сьогодні",
    cancel: "Закрити",
    willAttend: "Відвідаю",
    description: "Опис",
    totalParticipants: "Всього учасників",
    conversations: "Чати",
    newConversation: "Новий чат",
    myConversations: "Мої чати",
    allConversations: "Всі чати",
    empty: "Немає повідомлень",
    send: "Відправити",
    typeMessage: "Ваше повідомлення",
    search: "Пошук",
    searchPhrase: "Назва заходу",
    university: "Навчальний заклад"
  }
}