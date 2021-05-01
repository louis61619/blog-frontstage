import { Map } from 'immutable'

import * as actionTypes from './constants'

const defaultState = Map({
  recommendScrollTop: 0,
  checkDetail: {},
  marknav: []
})

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_RECOMMEND_SCROLL_TOP:
      return state.set("recommendScrollTop", action.recommendScrollTop)
    case actionTypes.CHANGE_CHECK_DETAIL:
      return state.set("checkDetail", action.item)
    case actionTypes.CHANGE_MARK_NAV:
      return state.set("marknav", action.list)
    default:
      return state;
  }
}

export default reducer