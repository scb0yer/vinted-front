import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = (props) => {
  // Create the useStates
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);

  // Post the datas to pay
  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);
    const stripeResponse = await stripe.createToken(cardElement, {
      name: props.userInfos[0],
    });
    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;
    const title = props.productToBuy[0];
    const amount = props.amount;
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

  // Displays the payment informations and stripe only if the user is logged
  return (
    <>
      {props.token ? (
        !completed ? (
          <form onSubmit={handleSubmit} className="payment">
            <div>
              <h2>Résumé de la commande</h2>
            </div>
            <div>
              <div>
                <div>{props.productToBuy[0]} : </div>
                <div>{props.productToBuy[1]} €</div>
              </div>
              <div>
                <div>Frais de protection acheteurs :</div>
                <div>{props.buyerCosts} €</div>
              </div>
              <div>
                <div>Frais de port :</div>
                <div>{props.shippingCosts} €</div>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <strong>Total :</strong>
                </div>
                <div>
                  <strong>{props.amount} €</strong>
                </div>
              </div>
            </div>
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
