import _request from "request";

var request = _request.defaults({ jar: true });

export function requestApi({ url, method, body, headers = {} }) {
  var options = {
    rejectUnauthorized: false,
    method,
    url,
    headers: {
      ...headers,
      "Cache-Control": "no-cache",
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body,
    json: true
  };

  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve, reject) => {
    request(options, function(error, response, body) {
      if (error) {
        reject(error);
      }
      resolve({ response, body });
    });
  });
}
