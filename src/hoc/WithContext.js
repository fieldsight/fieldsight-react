import React from "react";
import { RegionConsumer } from "../context";

const WithContext = Component => {
  return props => (
    <RegionConsumer>
      {value => <Component {...props} value={value} />}
    </RegionConsumer>
  );
};

export default WithContext;
