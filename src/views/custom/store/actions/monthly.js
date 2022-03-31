import { getInfo, getReports, deactiveOrder, activeOrder, getSubInfo, pauseSubOrder, resumeSubOrder } from '../../../../apis/monthly'

// ** Get Data
export const getData = target => {  
  return dispatch => {
    dispatch({ type: 'MONTHLY_REQUEST' })
    return getInfo(target).then(res => {      
      dispatch({
        type: 'GET_MONTHLY_DATA',
        data: res.data?.items[0],
        target
      })
    })
      .catch(() => {
        dispatch({
          type: 'GET_MONTHLY_DATA',
          data: null,
          target
        })
      })
  }
}

// ** Get ChartData
export const getChartData = target => {
  return dispatch => {
    dispatch({ type: 'MONTHLY_REQUEST' })
    getReports(target).then(res => {
      dispatch({
        type: 'GET_MONTHLY_REPORTS',
        reports: res.data?.items
      })
    })
      .catch(() => {
        dispatch({
          type: 'GET_MONTHLY_REPORTS',
          reports: []
        })
      })
  }
}

// ** Deactive Order
export const deactive = order_id => {
  return (dispatch, getState) => {
    dispatch({ type: 'MONTHLY_REQUEST' })
    deactiveOrder(order_id)
      .then(() => {
        dispatch({ type: 'MONTHLY_ACTION_SUCCESS', success: 'deactive' })
        dispatch(getData(getState().monthly.target))
      })
  }
}

// ** Active Order
export const active = order_id => {
  return (dispatch, getState) => {
    dispatch({ type: 'MONTHLY_REQUEST' })
    activeOrder(order_id)
      .then(() => {
        dispatch({ type: 'MONTHLY_ACTION_SUCCESS', success: 'active' })
        dispatch(getData(getState().monthly.target))
      })
  }
}

// ** Get Data
export const getSubData = order_id => {
  return dispatch => {
    dispatch({ type: 'MONTHLY_REQUEST' })
    return getSubInfo(order_id).then(res => {
      dispatch({
        type: 'GET_SUB_DATA',
        data: res.data?.items[0]
      })
    })
      .catch(() => {
        dispatch({
          type: 'GET_SUB_DATA',
          data: null
        })
      })
  }
}

// ** pause SubOrder
export const pause = (order_id, subOrder_id) => {
  return dispatch => {
    dispatch({ type: 'MONTHLY_REQUEST' })
    pauseSubOrder(order_id, subOrder_id)
      .then(() => {
        dispatch({ type: 'MONTHLY_ACTION_SUCCESS', success: 'pause' })
        dispatch(getSubData(order_id))
      })
  }
}

// ** resume SubOrder
export const resume = (order_id, subOrder_id) => {
  return dispatch => {
    dispatch({ type: 'MONTHLY_REQUEST' })
    resumeSubOrder(order_id, subOrder_id)
      .then(() => {
        dispatch({ type: 'MONTHLY_ACTION_SUCCESS', success: 'resume' })
        dispatch(getSubData(order_id))
      })
  }
}
