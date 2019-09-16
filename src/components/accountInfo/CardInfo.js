import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";

class CardInfo extends Component {
  render() {
    return (
      <div className="card-input-wrap mt-4 mb-4">
        <div className="checkout">
          <p> Credit or debit card</p>
          <CardElement />
          {/* onChange={this.handleChange} /> */}
          {/* {Object.keys(errors).length > 0 && (
            <span className="card-error">{errors.message}</span>
          )} */}
        </div>
      </div>
    );
  }
}

export default injectStripe(CardInfo);
