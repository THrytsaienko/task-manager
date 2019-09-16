import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [],
    priorityList: [ 'Low', 'Normal', 'High' ]
  },
  mutations: {
    getTasks(state, data){
      state.tasks = data;
    },
    deleteTask(state, id){
      state.tasks = state.tasks.filter(task => {
        return task.id !== id
      });
    },
    updateTask(state, id, task){
      state.tasks = state.tasks.map(item => {
        if(item.id === id){
          item = task;
        }
        return item;
      })
    }
  },
  actions: {
    getTasks({commit}, data){
      commit('getTasks', data);
    }
  }
})
