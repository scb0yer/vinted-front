import { useParams } from "react-router-dom";

export default function OfferPage(props) {
  const { id } = useParams();
  console.log("params id>>", id);

  return (
    <section>
      {props.data.map((offer, index) => {
        return (
          offer._id === id && (
            <div className="offerPage" key={index}>
              <div>
                <img src={offer.product_pictures[0].secure_url} alt="photo" />
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
                  <button>Acheter</button>
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
