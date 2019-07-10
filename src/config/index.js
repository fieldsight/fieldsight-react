import axios from "axios";

let csrfVal = window.csrf ? window.csrf : "FasSURCaozAKo7OHtkIhiTtOag7hVBBt";
let tokenVal = window.token
  ? window.token
  : "17ede4b52a21f1ec2b73525791750418113af4f1";

let baseURL = window.base_url
  ? window.base_url
  : "https://fieldsight.naxa.com.np/";

const setDefault = () => {
  axios.defaults.baseURL = baseURL;
  axios.defaults.headers.common["X-CSRFTOKEN"] = csrfVal;
  axios.defaults.headers.common["Authorization"] = "Token " + tokenVal;
  axios.defaults.headers.common["Content-Type"] = "application/json";
};

export default setDefault;
