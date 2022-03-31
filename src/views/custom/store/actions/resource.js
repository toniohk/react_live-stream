import { getResourceReports } from '../../../../apis/resource'

// ** Get Reports
export const getReports = () => {
  return dispatch => {
    return getResourceReports().then(res => {
      dispatch({
        type: 'GET_DATA',
        total: res.data?.items[0]?.value,
        available: res.data?.items[1]?.value
      })
      setTimeout(() => {
        dispatch(getReports())
      }, 30000)
    })
    .catch(() => {
      dispatch({
        type: 'GET_DATA',
        total: null,
        available: null
      })
      setTimeout(() => {
        dispatch(getReports())
      }, 30000)
    })
  }
}
