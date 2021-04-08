import request from './request'

export function getTopRecommned() {
  return request({
    url: "/default/getTopRecommend",
  })
}

export function getArticleList(offset=0, size=4) {
  return request({
    url: "/default/getArticleList",
    params: {
      offset, 
      size
    }
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

export function getAuthorInfo() {
  return request({
    url: "/default/author"
  })
}