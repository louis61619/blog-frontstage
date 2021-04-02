import request from './request'
// import store from '~/store'
import { initializeStore } from '~/store'
const store = initializeStore()
// console.log(store.getState().getIn(["user", "userInfo"]))
function getToken() {
  return store.getState().getIn(["user", "userSession"])?.accessToken
}

export function login(name, email, image, token) {
  return request({
    method: "POST",
    url: "/user/login",
    data: {
      name,
      email,
      image,
      token
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

export function getFavoriteList(offset, size) {
  return request({
    url: "/user/favoriteList",
    params: {
      offset,
      size
    },
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

export function getNoticeList(offset, size) {
  return request({
    method: "GET",
    url: "/user/notice",
    params: {
      offset,
      size
    },
    headers: {
      'Authorization': getToken()
    }
  })
}

export function editUserName(name) {
  return request({
    method: "PATCH",
    url: "/user/info/modify",
    data: {
      name
    },
    headers: {
      'Authorization': getToken()
    }
  })
}

export function uploadAvatar(data) {
  return request({
    method: "POST",
    url: "/user/avatar/upload",
    headers: {
      "content-type": "multipart/form-data",
      'Authorization': getToken()
    },
    data,
  })
}

export function addVisits() {
  return request({
    method: "PATCH",
    url: "/default/addVistis",
  })
}