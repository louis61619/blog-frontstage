import request from './request'
import { initializeStore } from '~/store'

const store = initializeStore()
function getToken() {
  return store.getState().getIn(["user", "userSession"])?.accessToken
}

export function writeComment(articleId, content) {
  return request({
    method: "POST",
    url: "/user/comment",
    data: {
      articleId,
      content
    },
    headers: {
      'Authorization': getToken()
    }
  })
}

export function writeCommentReply(articleId, content, commentId) {
  return request({
    method: "POST",
    url: "/user/reply/" + commentId,
    data: {
      articleId,
      content
    },
    headers: {
      'Authorization': getToken()
    }
  })
}

export function modifyComment(content, commentId) {
  return request({
    method: "PATCH",
    url: "/user/modifyComment/" + commentId,
    data: {
      content
    },
    headers: {
      'Authorization': getToken()
    }
  })
}

export function deleteComment(commentId) {
  return request({
    method: "DELETE",
    url: "/user/deleteComment/" + commentId,
    headers: {
      'Authorization': getToken()
    }
  })
}