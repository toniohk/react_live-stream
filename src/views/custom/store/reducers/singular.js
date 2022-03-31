// ** Initial State
const initialState = {
  data: null,
  reports: [],
  target: null,
  success: null,
  loading: false
}

const SingularReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SINGULAR_DATA':
      return { ...state, data: action.data, target: action.target, loading: false }
    case 'GET_SINGULAR_REPORTS':
      return { ...state, reports: action.reports, loading: false }
    case 'SINGULAR_ACTION_SUCCESS':
      return { ...state, success: action.success }
    case 'SINGULAR_ALERTED':
      return { ...state, success: null }
    case 'SINGULAR_REQUEST':
      return { ...state, loading: true }
    case 'SINGULAR_INITIAL':
      return { ...state, target: null }
    default:
      return state
  }
}
export default SingularReducer
