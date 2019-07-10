import axios from "axios";

let csrfVal = window.csrf ? window.csrf : "FasSURCaozAKo7OHtkIhiTtOag7hVBBt";
let tokenVal = window.token
  ? window.token
  : "91a844e62e86b6e336b8fb440340cbeaabf601fe";

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
