import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function OfferPage(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("params id>>", id);

  return (
    <section>
      {props.data.map((offer, index) => {
        return (
          offer._id === id && (
            <div className="offerPage" key={index}>
              <div className="picturesContainer">
                <div
                  className={
                    offer.product_image[1] ? "mainPicture" : "uniquePicture"
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
                      <div>
                        <div>
                          {offer.product_image[2] && (
                            <img src={offer.product_image[2]} alt="photo" />
                          )}
                        </div>
                        <div>
                          {offer.product_image[3] && (
                            <img src={offer.product_image[3]} alt="photo" />
                          )}
                        </div>
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
                          {detail.MARQUE && (
                            <div className="subDetails">
                              <div>MARQUE :</div>
                              <div>{detail.MARQUE}</div>
                            </div>
                          )}
                          {detail.TAILLE && (
                            <div className="subDetails">
                              <div>TAILLE :</div>
                              <div>{detail.TAILLE}</div>
                            </div>
                          )}
                          {detail.ÉTAT && (
                            <div className="subDetails">
                              <div>ÉTAT :</div>
                              <div>{detail.ÉTAT}</div>
                            </div>
                          )}
                          {detail.COULEUR && (
                            <div className="subDetails">
                              <div>COULEUR :</div>
                              <div>{detail.COULEUR}</div>
                            </div>
                          )}
                          {detail.EMPLACEMENT && (
                            <div className="subDetails">
                              <div>EMPLACEMENT :</div>
                              <div>{detail.EMPLACEMENT}</div>
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
                    {offer.owner.account.avatar && (
                      <img
                        className="avatar"
                        src={offer.owner.account.avatar.secure_url}
                        alt="avatar"
                      />
                    )}{" "}
                    {offer.owner.account.username}
                  </div>
                </div>
                <div>
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
