import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function OfferPage(props) {
  const navigate = useNavigate();
  const { id } = useParams();

  // Calculate the total amount with shipping costs and buyer costs when a product is added to the card
  useEffect(() => {
    const amount =
      Number(props.productToBuy[1]) +
      Number(props.buyerCosts) +
      Number(props.shippingCosts);
    amount.toFixed(2);
    props.setAmount(amount);
  }, [props.productToBuy]);

  // Look for all the offer that matchs with the id (normally there is only one)
  return (
    <section>
      {props.data.map((offer, index) => {
        return (
          offer._id === id && (
            <div className="offerPage" key={index}>
              {/* well, that mess doesn't look fancy but at the end it makes a (lovely) mosaic depending on how many pictures there are */}
              <div className="picturesContainer">
                <div
                  className={
                    offer.product_image[1] ? "mainPicture " : "uniquePicture "
                  }
                >
                  {offer.product_image[0] && (
                    <img src={offer.product_image[0]} alt="photo" />
                  )}
                </div>
                {offer.product_image[1] && (
                  <div className="otherPictures">
                    <div>
                      {offer.product_image[1] && (
                        <img src={offer.product_image[1]} alt="photo" />
                      )}
                    </div>
                    {!offer.product_image[3] ? (
                      <div>
                        {offer.product_image[2] && (
                          <img src={offer.product_image[2]} alt="photo" />
                        )}
                      </div>
                    ) : (
                      <div className="picturesContainer2">
                        {offer.product_image[2] && (
                          <img src={offer.product_image[2]} alt="photo" />
                        )}

                        {offer.product_image[3] && (
                          <img src={offer.product_image[3]} alt="photo" />
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div>
                <div className="font-xl">
                  {offer.product_price.toString().replace(".", ",")} €
                </div>
                <br />
                <div className="details">
                  {offer.product_details.map((detail, index) => {
                    return (
                      <div key={index}>
                        <div>
                          {detail.marque && (
                            <div className="subDetails">
                              <div>MARQUE :</div>
                              <div>{detail.marque}</div>
                            </div>
                          )}
                          {detail.taille && (
                            <div className="subDetails">
                              <div>TAILLE :</div>
                              <div>{detail.taille}</div>
                            </div>
                          )}
                          {detail.état && (
                            <div className="subDetails">
                              <div>ÉTAT :</div>
                              <div>{detail.état}</div>
                            </div>
                          )}
                          {detail.couleur && (
                            <div className="subDetails">
                              <div>COULEUR :</div>
                              <div>{detail.couleur}</div>
                            </div>
                          )}
                          {detail.emplacement && (
                            <div className="subDetails">
                              <div>EMPLACEMENT :</div>
                              <div>{detail.emplacement}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <div>
                    <h2>{offer.product_name}</h2>
                  </div>

                  <div className="font-m">{offer.product_description}</div>
                  <br />
                  <div>
                    {/* to show the owner avatar if there is one */}
                    {offer.owner.account.avatar && (
                      <img
                        className="avatar"
                        src={offer.owner.account.avatar}
                        alt="avatar"
                      />
                    )}{" "}
                    {offer.owner.account.username}
                  </div>
                </div>
                <div>
                  {/* add the product in the card, so amount is calculated and navigate to the payment page */}
                  <button
                    onClick={(event) => {
                      const productToBuy = [];
                      productToBuy.push(offer.product_name);
                      productToBuy.push(offer.product_price);
                      props.setProductToBuy(productToBuy);
                      navigate("/payment");
                    }}
                  >
                    Acheter
                  </button>
                </div>
              </div>
            </div>
          )
        );
      })}
      ;
    </section>
  );
}
