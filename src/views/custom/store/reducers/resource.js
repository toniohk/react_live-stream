// ** Initial State
const initialState = {
  total: null,
  available: null
}

const ResourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return { ...state, total: action.total, available: action.available }
    default:
      return state
  }
}
export default ResourceReducer
