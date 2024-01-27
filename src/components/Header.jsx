import { Link, useNavigate } from "react-router-dom";
import Vinted_Logo from "../assets/Vinted_Logo.png";

const Header = (props) => {
  const navigate = useNavigate();
  const onChange = (event, target) => {
    if (target === "search") {
      // props.setKeyword(event.target.value);
      navigate(`/offers?title=${event.target.value}`);
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
            value={props.search}
            onChange={(event) => {
              onChange(event, "search");
            }}
          />
        </div>
        <div>
          <div>Trier par prix :</div>
          <div>Prix entre : </div>
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
          <button className="button1">Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};
export default Header;
