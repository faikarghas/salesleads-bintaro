import Router from 'next/router';

export const actionTypes = {
  GET_LIST_FILTER: 'GET_LIST_FILTER',
  REMOVE_LIST_FILTER: 'REMOVE_LIST_FILTER',
  SET_BADGE: 'SET_BADGE',
}

function arrayRemove(arr, value) {
  return arr.filter(function(ele){
      return ele != value;
  });
}

export const getFilterList = (data) => {
  return (dispatch) => {
    let res = []
    res.push(data)
    dispatch({type: actionTypes.GET_LIST_FILTER,payload: res});
  };
};

export const removeFilterList = (data) => {
  return (dispatch) => {
    dispatch({type: actionTypes.REMOVE_LIST_FILTER,payload: data});
  };
};

export const setBadge = (data) => {
  return (dispatch) => {
    dispatch({type: actionTypes.SET_BADGE,payload: data});
  };
};