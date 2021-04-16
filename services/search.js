import request from './request'

export function searchArticleTitle(offset=0, size=4, keyword) {
  return request({
    url: "/default/searchArticleTitle",
    params: {
      offset,
      size,
      keyword
    }
  })
}

export function searchArticleLabel(offset=0, size=4, keyword) {
  return request({
    url: "/default/searchArticleLabel",
    params: {
      offset,
      size,
      keyword
    }
  })
}