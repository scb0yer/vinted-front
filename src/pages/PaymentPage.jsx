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
          setSignUpVisible={props.setSignUpVisible}
          setLoginVisible={props.setLoginVisible}
        />
      </Elements>
    </section>
  );
}
