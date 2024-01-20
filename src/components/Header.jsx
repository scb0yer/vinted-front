import { Link } from "react-router-dom";
import Vinted_Logo from "../assets/Vinted_Logo.png";

const Header = (props) => {
  return (
    <header>
      <div className="col1">
        <img src={Vinted_Logo} alt="Logo" />
      </div>
      <div className="col2">
        <div>
          <input
            type="search"
            id="search"
            placeholder="Rechercher des articles"
            value={props.search}
          />
        </div>
        <div>
          <div>Trier par prix :</div>
          <div>Prix entre : </div>
        </div>
      </div>
      <div className="col3">
        <div>
          <button>S'inscrire</button>
          <button>Se connecter</button>
        </div>
        <div>
          <button>Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};
export default Header;
