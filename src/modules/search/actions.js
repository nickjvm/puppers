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
  return async (dispatch, getState) => {
    try {
      const { search } = getState();
      const response = await fetch(`/pets/?location=${search.location}`);
      const data = await response.json();
      dispatch(storeSearchResults(data.pets.pet));
    } catch (e) {
      dispatch(error(e));
    }
  };
}

export const SET_SEARCH_PARAMS = "search/SET_SEARCH_PARAMS";
export function setSearchParams(key, value) {
  return {
    type: SET_SEARCH_PARAMS,
    key,
    value
  };
}

export const GET_ZIP_FROM_COORDS = "search/GET_ZIP_FROM_COORDS";
export function getZipFromCoords(coords) {
  return async dispatch => {
    try {
      const response = await fetch("/geo", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ lat: coords.latitude, long: coords.longitude }) // body data type must match "Content-Type" header
      });
      const data = await response.json();
      dispatch(setSearchParams("location", data.zip));
    } catch (e) {
      dispatch(error(e));
    }
  };
}
