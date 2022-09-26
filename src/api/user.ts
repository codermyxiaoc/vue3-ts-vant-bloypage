import { request } from "./request";

export function createuser(data: any) {
  return request({
    url: '/api/createuser',
    method: 'post',
    data: data,
  })
}
export function loginuser(data: any) {
   return request({
     url: '/api/namelogin',
     method: 'post',
     data
   })
}
export function userInfo(token: string) {
  return request({
    url: '/my/userinfo',
    method: 'get',
    headers: {
      'Authorization': token
    },
  })
}
export function changepassword(data: Object,token: string) {
  return request({
    url: '/my/updatepwd',
    method: 'post',
    headers: {
      'Authorization': token
    },
    data
  })
}
export function detuser(data: Object,token: string) {
  return request({
    url: '/my/Offuser',
    headers: {
      'Authorization': token
    },
    method: 'post',
    data
  })
}
export function updatauser(data: Object,token: string) {
  return request({
    url: '/my/updateuser',
    method: 'post',
    headers: {
      'Authorization': token
    },
    data
  })
}
export function updatepic(token: string, fromdata: any) {
  return request({
    method: 'post',
    url: '/my/headpor',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': token,
    },
    data: fromdata
  })
}
export function getcode(phone: string) {
  return request({
    method: 'post',
    url:'/api/getcode',
    data: {
      cell_phone: phone
    }
  })
}
export function getforgetpowcode(phone: string) {
  return request({
    method: 'post',
    url: '/api/forgetpowcode',
    data: {
      cell_phone: phone
    }
  })
}
export function getforgetpow(data :any) {
  return request({
    url: '/api/forgetpow',
    method: 'post',
    data
  })
}
export function getPhoneLoginCode(phone:string) {
  return request({
    url: '/api/logincode',
    method: 'post',
    data: {
      cell_phone: phone
    }
  })
}
export function getPhoneLogin(data:any) {
  return request({
    url: '/api/phonelogin',
    method: 'post',
    data
  })
}