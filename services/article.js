import request from './request'

export function getLabels() {
  return request({
    url: "/default/getLabels"
  })
}

export function getArticleByLabelId(id) {
  return request({
    url: "/default/getArticleByLabelId/" + id 
  })
}

export function getDetailRecommend() {
  return request({
    url: "/default/getDetailRecommend"
  })
}