import { createStore } from 'vuex'
const axios = require("axios").default;
const url = process.env.VUE_APP_API_URL + '/';

const store = createStore({
  state: {
    user : null,
    token: (localStorage.getItem('user-token')? localStorage.getItem('user-token') : null) || null,
    status: '',
  },
  mutations: {
    authRequest(state) {
      state.status = 'loading'
    },
    authSuccess(state, params) {
      state.status = 'success'
      state.token = params.token
      state.user = params.user
    },
    authError(state) {
      state.status = 'error'
    },
    deleteToken(state) {
      state.token = null;
    }
  },
  actions: {
    authRequest({commit}, user) {
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        commit('authRequest')
        axios.post(url + 'auth/newUser', {user: user})
          .then((res: {data: any}) => {
            const token = res.data.token;
            user = res.data.user;
            if(!token) reject('invalid token')
            else {
              localStorage.setItem('user-token', token) // store the token in localstorage
              commit('authSuccess', {token, user})
            }
            // you have your token, now log in your user :)
              resolve(res)
          })
        .catch((err: any) => {
          commit('authError', err)
          localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
          reject(err)
        })
      })
    },
    verifyToken({commit, state}) {
      if(state.token) {
        return new Promise((resolve, reject) => { // The Promise used for router redirect in login
          commit('authRequest')
          axios.post(url + 'auth/getUser', {token: state.token})
            .then((res: any) => {
              const user = res.data.user;
              const token = res.data.token;
              commit('authSuccess', {token, user})
              // you have your token, now log in your user :)
              resolve(res)
            })
          .catch((err: any) => {
            commit('authError', err)
            localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
            reject(err)
          })
        })
      }
    },
    logout({commit, state}) {
      if(state.token) {
        commit('deleteToken');
        localStorage.removeItem('user-token')
      }
    }
  },

  getters: {
    isAuthenticated: (state: { token: any; }) => !!state.token,
    authStatus: (state: { status: any; }) => state.status,
    user: (state) => state.user,
    token: (state) => state.token
  },
});

export default store;
