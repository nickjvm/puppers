export const APP_ERROR = "global/APP_ERROR";

export function error(payload) {
  return {
    type: APP_ERROR,
    payload
  };
}
