import { Link } from "react-router-dom";
import Image from "../assets/vignette-focus.jpg";

export default function HomePage(props) {
  return (
    <div>
      <img className="banner" src={Image} alt="photo" />
      <br />
      <div className="container">
        {props.data.map((offer, index) => {
          return (
            <Link className="offer" to={`/offer/${offer._id}`} key={index}>
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
              <div>
                <img
                  className="photo"
                  src={offer.product_image[0]}
                  alt="photo"
                />
              </div>
              <div>{offer.product_price} €</div>
              <div>
                {offer.product_details.map((detail, index) => {
                  return (
                    <div key={index}>{detail.TAILLE && detail.TAILLE}</div>
                  );
                })}
              </div>
              <div>
                {offer.product_details.map((detail, index) => {
                  return (
                    <div key={index}>{detail.MARQUE && detail.MARQUE}</div>
                  );
                })}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
