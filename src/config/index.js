import axios from "axios";

let csrfVal = window.csrf ? window.csrf : "FasSURCaozAKo7OHtkIhiTtOag7hVBBt";
let tokenVal = window.token
  ? window.token
  : "78dfa7c51311f4ef574ed579b6d2f00291fd3bbc";

let baseURL = window.base_url
  ? window.base_url
  : "https://fieldsight.naxa.com.np/";

const setDefault = () => {
  axios.defaults.baseURL = baseURL;
  axios.defaults.headers.common["X-CSRFTOKEN"] = csrfVal;
  axios.defaults.headers.common["Authorization"] = tokenVal;
  // axios.defaults.headers.common["Content-Type"] = "application/json";
};

export default setDefault;
