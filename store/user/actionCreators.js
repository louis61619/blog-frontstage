import * as actionTypes from './constants'

import { signIn, signOut, useSession, getSession } from "next-auth/client";
import { 
  getUserInfo,
  addFavorite,
  cancelFavorite,
  getFavoriteList,
  getNoticeList,
  editUserName,
  addVisits
} from '~/services/user'
import { formatJsonStr } from '~/utils/formate-utils'

export const changeLoginModelStatus = status => ({
  type: actionTypes.CHANGE_LOGIN_MODEL_STATUS,
  status
})

const changeUserSession = userSession => ({
  type: actionTypes.CHANGE_USER_SESSION,
  userSession
})

const changeUserInfo = userInfo => ({
  type: actionTypes.CHANGE_USER_INFO,
  userInfo
})

const changeFavoriteList = list => ({
  type: actionTypes.CHANGE_FAVORITE_LIST,
  list
})

const changeNoticeList = list => ({
  type: actionTypes.CHANGE_NOTICE_LIST,
  list
})

const changeVisitsChecked = () => ({
  type: actionTypes.CHANGE_VISITS_CHECKED
})

export const resetUser = () => ({
  type: actionTypes.RESET_USER
})

const changeUserName = name => ({
  type: actionTypes.CHANGE_USER_NAME,
  name
})

const changeIsLoaging = () => ({
  type: actionTypes.CHANGE_IS_LOADING,
})

export const changeVisitsCheckedAction = () => {
  return async (dispatch, getState) => {
    const visitsChecked = getState().getIn(["user", "visitsChecked"])
    if(!visitsChecked) {
      dispatch(changeVisitsChecked())
      addVisits()
    }
  }
}

export const getUserInfoAction = () => {
  return async dispatch => {
    const res = await getSession()
    if(res === null) {
      dispatch(changeUserSession({}))
      return dispatch(changeIsLoaging())
    }
    dispatch(changeUserSession(res?.user))
    const userInfo = {...res.user}
    // userInfo.favorite = JSON.parse(userInfo?.favorite)
    if(userInfo?.favorite) {
      userInfo.favorite = JSON.parse(userInfo.favorite)
    }
    dispatch(changeUserInfo(userInfo))
    dispatch(changeIsLoaging())
  }
}

export const addFavoriteAction = (articleId) => {
  return async (dispatch, getState) => {
    const userInfo = getState().getIn(["user", "userInfo"])
    if(userInfo.favorite === null) userInfo.favorite = []
    userInfo.favorite.push(articleId)
    await addFavorite(articleId)
    dispatch(changeUserInfo(userInfo))
  }
}

export const cancelFavoriteAction = (articleId, willChangeList) => {
  return async (dispatch, getState) => {
    const userInfo = getState().getIn(["user", "userInfo"])
    const favoriteList = getState().getIn(["user", "favoriteList"])

    if(willChangeList) {
      const favoriteListIndex = favoriteList.map(item => item.id).indexOf(articleId)
      favoriteList.splice(favoriteListIndex, 1)
      dispatch(changeFavoriteList([...favoriteList]))
    }

    if(userInfo.favorite === null) userInfo.favorite = []
    const articleIndex = userInfo.favorite.indexOf(articleId)
    userInfo.favorite.splice(articleIndex, 1)
    await cancelFavorite(articleId)
    dispatch(changeUserInfo(userInfo))
  }
}

export const getFavoriteListAction = (offset, size) => {
  return async (dispatch, getState) => {
    if(!offset) dispatch(changeFavoriteList([]))
    const list = getState().getIn(["user", "favoriteList"])
    const res = await getFavoriteList(offset, size)
    if(res.data === "is not login") return {data: []}
    dispatch(changeFavoriteList([...list, ...res.data]))
    return res
  }
}

export const getNoticeListAction = (offset, size) => {
  return async (dispatch, getState) => {
    if(!offset) dispatch(changeNoticeList([]))
    const list = getState().getIn(["user", "noticeList"])
    const res = await getNoticeList(offset, size)
    // console.log(data)
    dispatch(changeNoticeList([...list, ...res.data]))
    return res
  }
}

export const changeUserNameAction = name => {
  return async dispatch => {
    const result = await editUserName(name)
    dispatch(changeUserName(name))
  }
}