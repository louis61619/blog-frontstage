import request from './request'
// import store from '~/store'
import { initializeStore } from '~/store'
const store = initializeStore()
// console.log(store.getState().getIn(["user", "userInfo"]))
function getToken() {
  
  return store.getState().getIn(["user", "userSession"])?.accessToken
}

export function login(name, email, image) {
  return request({
    method: "POST",
    url: "/user/login",
    data: {
      name,
      email,
      image
    }
  })
}

export function getUserInfo(userId) {
  return request({
    url: "/user/info",
    params: {
      userId
    },
    headers: {
      'Authorization': getToken()
    }
  })
}

export function getFavoriteList() {
  return request({
    url: "/user/favoriteList",
    headers: {
      'Authorization': getToken()
    }
  })
}

export function addFavorite(articleId) {
  return request({
    method: "POST",
    url: "/user/favorite",
    data: {
      articleId
    },
    headers: {
      'Authorization': getToken() 
    }
  })
}

export function cancelFavorite(articleId) {
  return request({
    method: "DELETE",
    url: "/user/cancelFavorite",
    data: {
      articleId
    },
    headers: {
      'Authorization': getToken() 
    }
  })
}

export function getNoticeList() {
  return request({
    method: "GET",
    url: "/user/notice",
    headers: {
      'Authorization': getToken()
    }
  })
}