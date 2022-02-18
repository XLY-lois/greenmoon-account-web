const state = {
  logined: false,
  userInfo: {
    username:'',
    telephone:'',
    gender:'',
    avatar:'',
    email:'',
    address:'',
    intro:'',
    token:'',
    userId:''
  }
}
const mutations = {
  SET_LOGINED(state,status) {
    state.logined = status
  },
  SET_USERINFO(state,userInfo){
    state.userInfo = userInfo
  }
}
export default {
  state,
  mutations
}
