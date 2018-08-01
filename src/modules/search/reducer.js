import * as types from "./actions";

const initialState = {
  results: []
};

export default function searchReducer(state = initialState, { type, payload }) {
  switch (type) {
    case types.STORE_SEARCH_RESULTS: {
      return {
        ...state,
        results: payload
      };
    }
    default: {
      return state;
    }
  }
}
