import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignUp = ({ setVisible, setLoginVisible }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const onChange = (event, target) => {
    if (target === "name") {
      setName(event.target.value);
    } else if (target === "email") {
      setEmail(event.target.value);
    } else if (target === "password") {
      setPassword(event.target.value);
    } else if (target === "newsletter") {
      setNewsletter(!newsletter);
    }
  };

  const postData = async (name, email, password, newsletter) => {
    try {
      const { data } = await axios.post("http://localhost:3000/user/signup", {
        username: name,
        email: email,
        password: password,
        newsletter: newsletter,
      });
      alert("Votre compte a bien été créé.");
      console.log(data);
      setVisible(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="modal-root"
      onClick={() => {
        setVisible(false);
      }}
    >
      <form
        className="modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          className="close"
          onClick={() => {
            setVisible(false);
          }}
        >
          x
        </button>
        <h2>S'inscrire</h2>
        <input
          type="text"
          id="name"
          placeholder="Nom d'utilisateur"
          onChange={(event) => {
            onChange(event, "name");
          }}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          onChange={(event) => {
            onChange(event, "email");
          }}
        />
        <input
          type="password"
          id="password"
          placeholder="Mot de Passe"
          onChange={(event) => {
            onChange(event, "password");
          }}
        />
        <div>
          <input
            type="checkbox"
            id="newsletterCheckbox"
            name="newsletter"
            checked={newsletter}
            onChange={(event) => {
              onChange(event, "newsletter");
            }}
          />
          <label htmlFor="newsletter">S'inscrire à notre newsletter</label>
        </div>
        <p>
          En m'inscrivant, je confirme avoir lu et accepté les Termes &
          Conditions et Politiques de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        <button
          onClick={(event) => {
            event.preventDefault();
            postData(name, email, password, newsletter);
          }}
        >
          S'inscrire
        </button>
        <a
          onClick={() => {
            setVisible(false);
            setLoginVisible(true);
          }}
        >
          Tu as déjà un compte ? Connecte-toi !
        </a>
      </form>
    </div>
  );
};

export default SignUp;
