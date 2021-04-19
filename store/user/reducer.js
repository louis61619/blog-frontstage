import { Map } from 'immutable'

import * as actionTypes from './constants'

const defaultState = Map({
  userInfo: {},
  userSession: {},
  noticeList: [], // 留言通知
  favoriteList: [],
  visitsChecked: false,
  isLoading: false,
  loginModelStatus: false
})

function reducer(state = defaultState, action) {
  switch(action.type) {
    case actionTypes.CHANGE_USER_INFO:
      return state.set("userInfo", action.userInfo)
    case actionTypes.CHANGE_USER_SESSION:
      return state.set("userSession", action.userSession)
    case actionTypes.CHANGE_FAVORITE_LIST:
      return state.set("favoriteList", action.list)
    case actionTypes.CHANGE_NOTICE_LIST:
      return state.set("noticeList", action.list)
    case actionTypes.RESET_USER:
      return state = defaultState
    case actionTypes.CHANGE_USER_NAME:
      return state.setIn(["userInfo", "name"], action.name)
    case actionTypes.CHANGE_VISITS_CHECKED:
      return state.set("visitsChecked", true)
    case actionTypes.CHANGE_IS_LOADING:
      return state.set("isLoading", true)
    case actionTypes.CHANGE_LOGIN_MODEL_STATUS:
      return state.set("loginModelStatus", action.status)
    default:
      return state
  }
}

export default reducer