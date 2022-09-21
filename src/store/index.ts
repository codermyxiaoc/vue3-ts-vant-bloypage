import { defineStore } from "pinia";
import { userInfo } from '../api/user'
import { getinpreq } from '../api/atr'
export const useStore = defineStore('main', {
  state: () => {
    return {
      userinfo: {},
      artinfo: []
    }
  },
  getters: {

  },
  actions: {
    async getuserinfo(token: string) {
      const result = await userInfo(token)
      if(result.data.status === 0) {
        this.userinfo = result.data.message || {}
      } else {
        localStorage.removeItem('token')
      }
      return result.data.message
    },
    async getatr() {
      const result = await getinpreq()
      if(result.data.status === 0) {
        this.artinfo = result.data.message
        return 200
      }
    }
  }

})