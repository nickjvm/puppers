import { error } from "../global/actions";

export const STORE_SEARCH_RESULTS = "search/STORE_SEARCH_RESULTS";
export function storeSearchResults(payload) {
  return {
    type: STORE_SEARCH_RESULTS,
    payload
  };
}

export const GET_SEARCH_RESULTS = "search/GET_SEARCH_RESULTS";
export function getSearchResults(payload) {
  return async dispatch => {
    try {
      const response = await fetch("/pets");
      const data = await response.json();
      dispatch(storeSearchResults(data.pets.pet));
    } catch (e) {
      dispatch(error(e));
    }
  };
}
