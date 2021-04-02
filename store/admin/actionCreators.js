import * as actionTypes from './constants'
import { getAuthorInfo } from '~/services/home'

const changeAdminInfo = info => ({
  type: actionTypes.CHANGE_ADMIN_INFO,
  info
})

export const getAdminInfoAction = () => {
  return dispatch => {
    getAuthorInfo().then(res => {
      dispatch(changeAdminInfo(res))
    })
  }
}