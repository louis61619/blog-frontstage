import request from './request'

export function getTopRecommned() {
  return request({
    url: "/default/getTopRecommend"
  })
}

export function getArticleList() {
  return request({
    url: "/default/getArticleList"
  })
}

export function getArticleById(id) {
  return request({
    url: "/default/getArticleById",
    params: {
      id
    }
  })
}