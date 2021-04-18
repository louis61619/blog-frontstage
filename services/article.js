import request from './request'

export function getLabels() {
  return request({
    url: "/default/getLabels"
  })
}

export function getArticleByLabelId(id, offset=0, size=4) {
  // console.log('查詢'+id)
  return request({
    url: "/default/getArticleByLabelId/" + id ,
    params: {
      offset, 
      size
    }
  })
}

export function getDetailRecommend() {
  return request({
    url: "/default/getDetailRecommend"
  })
}