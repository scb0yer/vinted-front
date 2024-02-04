import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);
    const stripeResponse = await stripe.createToken(cardElement, {
      name: "L'id de l'acheteur",
    });
    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;
    const title = props.productToBuy[0];
    const amount = props.productToBuy[1];
    const response = await axios.post(
      "https://site--vinted--dzk9mdcz57cb.code.run/payment",
      {
        stripeToken,
        title,
        amount,
      }
    );
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return (
    <>
      {props.token ? (
        !completed ? (
          <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit">Valider</button>
          </form>
        ) : (
          <span>Paiement effectué ! </span>
        )
      ) : (
        <section className="notLogged">
          <div>Vous devez vous identifier pour accéder à cette page.</div>
          <div>
            <button
              onClick={() => {
                props.setSignUpVisible(true);
              }}
            >
              S'inscrire
            </button>

            <button
              onClick={() => {
                props.setLoginVisible(true);
              }}
            >
              Se connecter
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default CheckoutForm;
