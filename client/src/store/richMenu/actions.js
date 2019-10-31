import axios from 'axios'
import { Loading } from 'quasar'
export function getToken ({ commit }) {
  axios.get(`${process.env.API_URL}/api/token`).then(res => {
    commit('SET_ACCESS_TOKEN', res.data)
  })
}

export function getList ({ state, commit }, token) {
  return new Promise((resolve, reject) => {
    commit('SET_IS_LOAD')
    commit('SET_LIST', [])
    if (token) {
      commit('SET_ACCESS_TOKEN', token)
      axios.defaults.headers.common['token'] = token
    } else {
      axios.defaults.headers.common['token'] = state.accessToken
    }
    Loading.show()
    axios.post(`${process.env.API_URL}/api/list`).then(res => {
      Loading.hide()
      if (res.data !== 'error') {
        commit('SET_LIST', res.data)
        resolve()
      } else {
        reject()
      }
    }).catch(() => {
      // console.log(err)
      Loading.hide()
      reject()
    })
  })
}

export function postDelete ({ state, commit }, data) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common['token'] = state.accessToken
    axios.post(`${process.env.API_URL}/api/delete`, data).then(res => {
      if (res.data === 'ok') {
        resolve()
      } else {
        reject()
      }
    }).catch(() => {
      reject()
    })
  })
}

export function postCreate ({ state, commit }, data) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common['token'] = state.accessToken
    axios.post(`${process.env.API_URL}/api/create`, data).then(res => {
      if (res.data === 'ok') {
        resolve()
      } else {
        reject()
      }
    }).catch(() => {
      reject()
    })
  })
}

export function postDefault ({ state, commit }, data) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common['token'] = state.accessToken
    axios.post(`${process.env.API_URL}/api/default`, data).then(res => {
      if (res.data === 'ok') {
        resolve()
      } else {
        reject()
      }
    }).catch(() => {
      reject()
    })
  })
}

export function cancelDefault ({ state, commit }) {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.common['token'] = state.accessToken
    axios.delete(`${process.env.API_URL}/api/default`).then(res => {
      if (res.data === 'ok') {
        resolve()
      } else {
        reject()
      }
    }).catch(() => {
      reject()
    })
  })
}
