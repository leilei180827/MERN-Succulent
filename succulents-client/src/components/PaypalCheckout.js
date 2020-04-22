import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { connect } from "react-redux";
import { clear_cart } from "../actions/cartActions";

class PaypalCheckout extends React.Component {
  componentWillUnmount() {
    console.log("componentwillUnmount");
    let products = [];
    this.props.products.map((item, index) => {
      let temp = {
        succulentName: item.name,
        quantity: item.quantity,
      };
      products.push(temp);
    });
    let data = {
      address: this.props.recipient.address,
      products: products,
      recipientName: this.props.recipient.name,
    };
    this.props.user.userInfo._id &&
      (data.userId = this.props.user.userInfo._id);
    console.log(data);
    //this.props.clearCart();
    fetch("/api/user/add/orders", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        response.success && this.props.clear_cart();
        !response.success &&
          console.log("something went wrong,please try again");
      })
      .catch((error) => console.log("unknown error happened,please try again"));
  }
  render() {
    const onSuccess = (payment) => {
      // Congratulation, it came here means everything's fine!
      this.props.setFlashMessage(
        "The payment was succeeded! will redirect to main page soon"
      );
      console.log("The payment was succeeded!", payment);
      let time = setTimeout(() => {
        clearTimeout(time);
        this.props.history.push("/");
      }, 3000);

      // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
    };

    const onCancel = (data) => {
      // User pressed "cancel" or close Paypal's popup!
      this.props.setFlashMessage(
        "The payment was cancelled! please try again later"
      );
      console.log("The payment was cancelled!", data);
      // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    };

    const onError = (err) => {
      // The main Paypal's script cannot be loaded or somethings block the loading of that script!
      this.props.setFlashMessage(
        "something wrong happened! please try again later"
      );
      console.log("Error!", err);
      // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
      // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    };

    let env = "sandbox"; // you can set here to 'production' for production
    let currency = "AUD"; // or you can set this value from your props or state
    let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

    const client = {
      sandbox:
        "AWtLso7js0n_OEZEQUL9MufuEdG_HgNJD5bw2l2kYAhEaRZeZuYVdQsOEywTTGBgN9lnDJx1XLre3mr2",
      // process.env.REACT_APP_CLIENT_SANDBOX,
      production: "YOUR-PRODUCTION-APP-ID",
    };
    // In order to get production's app-ID, you will have to send your app to Paypal for approval first
    // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
    //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
    // For production app-ID:
    //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

    // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
    return (
      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={this.props.total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    );
  }
}
const mapStateToProps = (state) => ({
  recipient: state.recipient,
  products: state.cart.inCart,
  user: state.user,
});
export default connect(mapStateToProps, { clear_cart })(PaypalCheckout);
