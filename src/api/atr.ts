import { request } from "./request";
export function getinpreq() {
  return request({
    url: '/api/inpreq',
    method: 'get'
  })
}
export function addart(content: string ,token: string) {
  return request({
    url: '/art/addart',
    method: 'post',
    headers: {
      'Authorization': token
    },
    data:{
      content
    }
  })
}
export function detart(comment_id: number,token: string) {
  return request({
    url: '/art/detart',
    method: 'post',
    headers: {
      'Authorization': token
    },
    data: {
      comment_id
    }
  })
}
export function getinpcom(comment_id: number) {
  return request({
    url: '/api/inpcom',
    method: 'post',
    data: {
      comment_id
    }
  })
}
export function addcom(content: string,comment_id: number,token: string) {
  return request({
    url: '/art/addcom',
    method: 'post',
    headers: {
      'Authorization': token
    },
    data: {
      content,
      comment_id
    }
  })
}
export function delcom(replyuser_id: number,token: string) {
  return request({
    url: '/art/detcom',
    method: 'post',
    headers: {
      'Authorization': token
    },
    data: {
      replyuser_id
    }
  })
}