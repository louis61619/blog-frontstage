import * as actionTypes from "./constants"

export const changeRecommendScrollTop = recommendScrollTop => ({
  type: actionTypes.CHANGE_RECOMMEND_SCROLL_TOP,
  recommendScrollTop
})

export const changeCheckDetail = item => ({
  type: actionTypes.CHANGE_CHECK_DETAIL,
  item
})

export const changeMarkNav = list => ({
  type: actionTypes.CHANGE_MARK_NAV,
  list
})