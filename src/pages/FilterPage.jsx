import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FilterPage(props) {
  const { query } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?${query}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <section>
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
                src={offer.product_pictures[0].secure_url}
                alt="photo"
              />
            </div>
            <div>{offer.product_price} €</div>
            <div>
              {offer.product_details.map((detail, index) => {
                return <div key={index}>{detail.TAILLE && detail.TAILLE}</div>;
              })}
            </div>
            <div>
              {offer.product_details.map((detail, index) => {
                return <div key={index}>{detail.MARQUE && detail.MARQUE}</div>;
              })}
            </div>
          </Link>
        );
      })}
    </section>
  );
}
