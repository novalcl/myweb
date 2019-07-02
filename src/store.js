import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count:0,
    token:"",
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  mutations: {
    setCount(state,value){
      console.log(8888,state)
      console.log(9999,value)
      state.count = value;
    },
    setToken(state,value){
      state.token = value;
      localStorage.setItem("token",value)
    }
  },
  actions: {
    setAddCount(content,n){
      return content.commit('setCount', n)
    }
  },
  getters:{
    doneTodosCount: (state, getters) => {
      console.log(state)
      console.log(888,getters)
      return state.todos.length
    }
  }
})
