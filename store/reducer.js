import { combineReducers } from 'redux-immutable'

import { reducer as userReducer } from './user'
import { reducer as detailReducer } from './detail'

const cReducer = combineReducers({
  user: userReducer,
  detail: detailReducer
})

export default cReducer