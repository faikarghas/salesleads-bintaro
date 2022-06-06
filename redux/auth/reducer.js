import { actionTypes } from './action'
import {updateObject} from '../../utils/updateObject'

const initialState = {
  loginLoading: false,
  isLogin: false,
  idusers: 0,
  token: null,
  username: null,
  role: 0,
  message: null,

}

export default function reducer(state = initialState, action) {
  switch (action.type) {
      case actionTypes.AUTHENTICATE:
          return updateObject(state,{idusers: action.payload.idusers, token: action.payload.token, role: action.payload.role, username: action.payload.username});
      case actionTypes.REAUTHENTICATE:
          return updateObject(state,{idusers: action.payload.idusers, token: action.payload.token, role: action.payload.role, username: action.payload.username});
      default:
          return state
  }
}
