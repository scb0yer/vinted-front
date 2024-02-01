import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
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
    } else if (target === "price") {
      alert("clicked");
      newQuery[1] = `priceMax=${event.target.value[1]}`;
      setPriceMax(event.target.value[1]);
      newQuery[2] = `priceMin=${event.target.value[0]}`;
      setPriceMin(event.target.value[0]);
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
        <Link to={`/`}>
          <img src={Vinted_Logo} alt="Logo" />
        </Link>
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
              Prix entre : {priceMin} et {priceMax}
            </div>
            <RangeSlider
              min={0}
              max={500}
              defaultValue={[0, 500]}
              onChange={(event) => {
                onChange(event, "price");
              }}
            />
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
