import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Vinted_Logo from "../assets/Vinted_Logo.png";

const Header = (props) => {
  const newQuery = [...props.query];
  // Create the useStates for the filters
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(500);

  const navigate = useNavigate();

  // When we change an input, it sets the useState...
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

  // Display a fixed Header
  return (
    <header>
      {/* Lock the scroll when modals are activated */}
      {props.loginVisible
        ? document.body.classList.add("scroll-lock")
        : props.signUpVisible
        ? document.body.classList.add("scroll-lock")
        : document.body.classList.remove("scroll-lock")}

      <div className="col1">
        {/* when you click on the logo, queries are reset and you go back to the HomePage*/}
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
          {/* Well well... I really tried to use the react range... Anyway, that way works too... */}
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
      {/* on a small screen, it displays only the profile picto */}
      <div className="invisible-large">
        <Link to="/profil">
          <FontAwesomeIcon
            icon="user"
            size="2xl"
            style={{ color: "#1bb1ba" }}
          />
        </Link>
      </div>
      {/* on a large screen, it displays the profile picto when user is logged, otherwise buttons to login, signup and post */}
      <div className="col3">
        <div>
          {!props.token ? (
            <button
              onClick={() => {
                props.setSignUpVisible(true);
              }}
            >
              S'inscrire
            </button>
          ) : (
            <Link to="/profil">
              <FontAwesomeIcon
                icon="user"
                size="2xl"
                style={{ color: "#1bb1ba" }}
              />
            </Link>
          )}
          {!props.token && (
            <button
              onClick={() => {
                props.setLoginVisible(true);
              }}
            >
              Se connecter
            </button>
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
