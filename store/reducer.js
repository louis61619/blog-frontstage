import { combineReducers } from 'redux-immutable'

import { reducer as userReducer } from './user'
import { reducer as detailReducer } from './detail'
import { reducer as adminReducer } from './admin'

const cReducer = combineReducers({
  user: userReducer,
  detail: detailReducer,
  admin: adminReducer
})

export default cReducer