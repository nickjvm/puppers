import * as types from "./actions";

const initialState = {
  results: [],
  location: ""
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case types.STORE_SEARCH_RESULTS: {
      return {
        ...state,
        results: action.payload
      };
    }
    case types.SET_SEARCH_PARAMS: {
      return {
        ...state,
        [action.key]: action.value
      };
    }
    default: {
      return state;
    }
  }
}
