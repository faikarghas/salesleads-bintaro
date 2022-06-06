import { actionTypes } from './action'
import { updateObject } from '../../utils/updateObject'

const initialState = {
  listFilter: [],
  badge: 0
}

function arrayRemove(arr, value) {
  return arr.filter(function(ele){
      return ele != value;
  });
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_LIST_FILTER:
        return updateObject(state,{listFilter: [...state.listFilter,action.payload],badge: state.listFilter.length + 1});
    case actionTypes.REMOVE_LIST_FILTER:
        return updateObject(state,{listFilter: arrayRemove(state.listFilter,action.payload),badge: state.listFilter.length - 1});
    case actionTypes.SET_BADGE:
        return updateObject(state,{badge: action.listFilter.length});
    default:
        return state
  }
}


