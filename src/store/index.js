import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: {
      userName: '',
      userAge: null
    },
    childrens: []
  },
  getters: {
    userInfo: state => {
      return state.userInfo
    },
    childrens: state => {
      return state.childrens
    }
  },
  mutations: {
    updateForm(state, { userInfo, childrensInfo }) {
      state.userInfo = { ...userInfo };
      state.childrens.length = 0;
      childrensInfo.forEach(child => {
        state.childrens.push({ ...child });
      });
    }
  },
  actions: {
  },
  modules: {
  }
})
