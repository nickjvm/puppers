const initialState = {
    pets: []
}

function list(state = initialState, action) {
    switch (action.type) {
      case 'STORE_LIST':
        return Object.assign({}, state, {
          pets: action.data
        })
      default:
        return state
    }
  }
export default list 