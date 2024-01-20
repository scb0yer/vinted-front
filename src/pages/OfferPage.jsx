import { useParams } from "react-router-dom";

export default function OfferPage(props) {
  const { id } = useParams();
  console.log("params id>>", id);

  return props.data.map((offer, index) => {
    return (
      offer._id === id && (
        <div className="offerPage" key={index}>
          <div>
            <img src={offer.product_pictures[0].secure_url} alt="photo" />
          </div>
          <div>
            <div>{offer.product_price} €</div>
            <div>
              {offer.product_details.map((detail, index) => {
                return (
                  <div key={index}>
                    <div className="details">
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
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <h2>{offer.product_name}</h2>
            </div>
            <div>{offer.product_description}</div>
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
        </div>
      )
    );
  });
}
