import axios from "axios";

let csrfVal = window.csrf ? window.csrf : "FasSURCaozAKo7OHtkIhiTtOag7hVBBt";
let tokenVal = window.token
  ? window.token
  : "d00af785dedf78cd64f473278eac835b0755117b";
  

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
