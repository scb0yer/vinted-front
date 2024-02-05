import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

export default function PaymentPage(props) {
  const stripePromise = loadStripe(
    "pk_test_51OfkojB6SR0M9Yszlelc0xX8O5FGKMSQXx2KcqAuHL8YoHCzu6WCIqvQ8ZviBSJJJNXPYKQXjb1eIOkrc3yX8tCy00ajObBVY4"
  );
  return (
    <section className="paymentPage">
      <Elements stripe={stripePromise}>
        <CheckoutForm
          token={props.token}
          data={props.data.offers}
          setSignUpVisible={props.setSignUpVisible}
          setLoginVisible={props.setLoginVisible}
          productToBuy={props.productToBuy}
          userInfos={props.userInfos}
          amount={props.amount}
          shippingCosts={props.shippingCosts}
          buyerCosts={props.buyerCosts}
        />
      </Elements>
    </section>
  );
}
