// ** Initial State
const initialState = {
  data: null,
  reports: [],
  subData: null,
  target: null,
  success: null,
  loading: false
}

const MonthlyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MONTHLY_DATA':
      return { ...state, data: action.data, target: action.target, loading: false }
    case 'GET_SUB_DATA':
      return { ...state, subData: action.data, loading: false }
    case 'GET_MONTHLY_REPORTS':
      return { ...state, reports: action.reports, loading: false }
    case 'MONTHLY_ACTION_SUCCESS':
      return { ...state, success: action.success }
    case 'MONTHLY_ALERTED':
      return { ...state, success: null }
    case 'MONTHLY_REQUEST':
      return { ...state, loading: true }
    case 'MONTHLY_INITIAL':
      return { ...state, target: null }
    default:
      return state
  }
}
export default MonthlyReducer
