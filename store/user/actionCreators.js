import * as actionTypes from './constants'

import { signIn, signOut, useSession, getSession } from "next-auth/client";
import { 
  getUserInfo,
  addFavorite,
  cancelFavorite,
  getFavoriteList,
  getNoticeList
} from '~/services/user'
import { formatJsonStr } from '~/utils/formate-utils'

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

export const resetUser = () => ({
  type: actionTypes.RESET_USER
})

// export const getUserSessinAction = () => {
//   return async dispatch => {
//     // 獲取認證
//     const res = await getSession()
//     dispatch(changeUserSession(res?.user))
//   }
// }

export const getUserInfoAction = () => {
  return async dispatch => {
    const res = await getSession()
    if(res === null) {
      return dispatch(changeUserSession({}))
    }
    dispatch(changeUserSession(res?.user))
    // 獲取資料
    const userInfo = await getUserInfo(res?.user.id)
    // userInfo.favorite = JSON.parse(userInfo?.favorite)
    if(userInfo?.favorite) {
      userInfo.favorite = JSON.parse(userInfo.favorite)
    }
    dispatch(changeUserInfo(userInfo))
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

export const getFavoriteListAction = () => {
  return async dispatch => {
    const result = await getFavoriteList()
    dispatch(changeFavoriteList(result))
  }
}

export const getNoticeListAction = () => {
  return async dispatch => {
    const result = await getNoticeList()
    dispatch(changeNoticeList(result))
  }
}