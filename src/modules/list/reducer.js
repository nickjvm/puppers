const initialState = {
  pets: [],
  location: '80526',
  coordinates: {}
}

function list(state = initialState, action) {
  switch (action.type) {
    case 'STORE_LIST':
      return Object.assign({}, state, {
        pets: action.data
      })
    case 'SET_LOCATION':
      return Object.assign({}, state, {
        location: action.data
      })
    case 'STORE_LONGLAT':
      return Object.assign({}, state, {
        coordinates: action.data
      })
    default:
      return state
  }
}
export default list 