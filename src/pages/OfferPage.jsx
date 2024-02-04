import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function OfferPage(props) {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <section>
      {props.data.map((offer, index) => {
        return (
          offer._id === id && (
            <div className="offerPage" key={index}>
              <div className="picturesContainer">
                <div
                  className={
                    offer.product_image[1]
                      ? "mainPicture small"
                      : "uniquePicture small"
                  }
                >
                  {offer.product_image[0] && (
                    <img src={offer.product_image[0]} alt="photo" />
                  )}
                </div>
                {offer.product_image[1] && (
                  <div className="otherPictures small">
                    <div>
                      {offer.product_image[1] && (
                        <img src={offer.product_image[1]} alt="photo" />
                      )}
                    </div>
                    {!offer.product_image[3] ? (
                      <div className="small">
                        {offer.product_image[2] && (
                          <img src={offer.product_image[2]} alt="photo" />
                        )}
                      </div>
                    ) : (
                      <div className="pictureContainer2">
                        <div className="small">
                          {offer.product_image[2] && (
                            <img src={offer.product_image[2]} alt="photo" />
                          )}
                        </div>
                        <div className="small">
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
