import axios from "axios"
import nProgress from "nprogress"
import "nprogress/nprogress.css"


export function request(config: any){
  const instance = axios.create({
/*     baseURL: 'http://127.0.0.1', */
    baseURL: '---请直接搭后台---',
    timeout: 5000,
  })
  instance.interceptors.request.use((res) => {
    nProgress.start()
    return res
  })
  instance.interceptors.response.use((res) => {
    nProgress.done()
    return res
  })
  return instance(config)
}