import { getInfo, getReports, pauseOrder, resumeOrder, stopOrder } from '../../../../apis/singular'

// ** Get Data
export const getData = target => {
  return dispatch => {
    dispatch({ type: 'SINGULAR_REQUEST' })
    return getInfo(target).then(res => {
      dispatch({
        type: 'GET_SINGULAR_DATA',
        data: res.data?.items[0],
        target
      })
    })
      .catch(() => {
        dispatch({
          type: 'GET_SINGULAR_DATA',
          data: null,
          target
        })
      })
  }
}

// ** Get ChartData
export const getChartData = target => {
  return dispatch => {
    dispatch({ type: 'SINGULAR_REQUEST' })
    getReports(target).then(res => {
      dispatch({
        type: 'GET_SINGULAR_REPORTS',
        reports: res.data?.items
      })
    })
      .catch(() => {
        dispatch({
          type: 'GET_SINGULAR_REPORTS',
          reports: []
        })
      })
  }
}

// ** Pause Order
export const pause = (order_id, delay) => {
  return (dispatch, getState) => {
    dispatch({ type: 'SINGULAR_REQUEST' })
    pauseOrder(order_id, delay)
      .then(() => {
        dispatch({ type: 'SINGULAR_ACTION_SUCCESS', success: 'pause' })
        dispatch(getData(getState().singular.target))
      })
  }
}

// ** Resume Order
export const resume = (order_id, delay) => {
  return (dispatch, getState) => {
    dispatch({ type: 'SINGULAR_REQUEST' })
    resumeOrder(order_id, delay)
      .then(() => {
        dispatch({ type: 'SINGULAR_ACTION_SUCCESS', success: 'resume' })
        dispatch(getData(getState().singular.target))
      })
  }
}

// ** Stop Order
export const stop = (order_id) => {
  return (dispatch, getState) => {
    dispatch({ type: 'SINGULAR_REQUEST' })
    stopOrder(order_id)
      .then(() => {
        dispatch({ type: 'SINGULAR_ACTION_SUCCESS', success: 'stop' })
        dispatch(getData(getState().singular.target))
      })
  }
}
