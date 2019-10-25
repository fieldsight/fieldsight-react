import axios from "axios";

// use your token in place of "xxxx-xxxx-xxxx-xxxx"
// remove your token before pushing to github
let tokenVal = window.token ? window.token : "xxxx-xxxx-xxxx-xxxx";

let baseURL = window.base_url
  ? window.base_url
  : "https://fieldsight.naxa.com.np/";
//"http://192.168.1.44:8002/";

const setDefault = () => {
  axios.defaults.baseURL = baseURL;
  axios.defaults.headers.common["X-CSRFTOKEN"] = csrfVal;
  axios.defaults.headers.common["Authorization"] = tokenVal;
  // axios.defaults.headers.common["Content-Type"] = "application/json";
};

export default setDefault;
