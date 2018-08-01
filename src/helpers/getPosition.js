export default function(options) {
  return new Promise(function(resolve, reject) {
    if ("navigator" in window) {
      return navigator.geolocation.getCurrentPosition(resolve, reject, options);
    }
    reject({ error: "unsupported browser" });
  });
}
