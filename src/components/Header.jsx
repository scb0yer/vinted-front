import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Vinted_Logo from "../assets/Vinted_Logo.png";

const Header = (props) => {
  const newQuery = [...props.query];
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(500);
  const navigate = useNavigate();
  const onChange = (event, target) => {
    if (target === "search") {
      newQuery[0] = `title=${event.target.value}`;
      props.setQuery(newQuery);
      navigate("/");
    } else if (target === "priceMax") {
      newQuery[1] = `priceMax=${event.target.value}`;
      setPriceMax(event.target.value);
      props.setQuery(newQuery);
    } else if (target === "priceMin") {
      newQuery[2] = `priceMin=${event.target.value}`;
      setPriceMin(event.target.value);
      props.setQuery(newQuery);
    }
  };
  return (
    <header>
      {props.loginVisible
        ? document.body.classList.add("scroll-lock")
        : props.signUpVisible
        ? document.body.classList.add("scroll-lock")
        : document.body.classList.remove("scroll-lock")}
      <div className="col1">
        <img
          onClick={(event) => {
            props.setCount(1);
            props.setQuery(["title=", "priceMax=500", "priceMin=0", "count=1"]);
            navigate("/");
          }}
          src={Vinted_Logo}
          alt="Logo"
        />
      </div>
      <div className="col2">
        <div>
          <input
            type="search"
            id="search"
            placeholder="Rechercher des articles"
            onInput={() => {
              onChange(event, "search");
            }}
          />
        </div>
        <div>
          <div>Trier par prix :</div>
          <div>
            <div>
              Prix entre :{" "}
              <input
                type="range"
                value={priceMin}
                onChange={() => {
                  onChange(event, "priceMin");
                }}
                min="0"
                max={priceMax}
              />{" "}
              {priceMin}€ et
              <input
                type="range"
                value={priceMax}
                onChange={() => {
                  onChange(event, "priceMax");
                }}
                min={priceMin}
                max="500"
              />{" "}
              {priceMax}€
            </div>
          </div>
        </div>
      </div>
      <div className="col3">
        <div>
          <button
            onClick={() => {
              props.setSignUpVisible(true);
            }}
          >
            S'inscrire
          </button>
          {!props.token ? (
            <button
              onClick={() => {
                props.setLoginVisible(true);
              }}
            >
              Se connecter
            </button>
          ) : (
            <button>Se déconnecter</button>
          )}
        </div>
        <div>
          <button className="button1">
            <Link to={`/publish`}>Vends tes articles</Link>
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
