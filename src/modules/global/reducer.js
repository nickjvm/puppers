import * as types from "./actions";

const initialState = {
  error: ""
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.APP_ERROR: {
      return {
        ...state,
        error: payload
      };
    }
    default: {
      return state;
    }
  }
};
