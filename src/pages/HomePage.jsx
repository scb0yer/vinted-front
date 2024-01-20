import { Link } from "react-router-dom";

export default function HomePage(props) {
  console.log("essai", props.data);
  return (
    <div>
      <h1> HomePage component</h1>
      <br />
      {props.data.map((offer, index) => {
        return (
          <div key={index}>
            <div>
              {offer}
              {/* <img src={offer.owner.account.avatar.secure_url} alt="avatar" /> */}
            </div>
            <div></div>
            <div></div>
          </div>
        );
      })}
    </div>
  );
}
