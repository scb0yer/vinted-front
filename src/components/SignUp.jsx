import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignUp = ({ setVisible }) => {
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
      if (newsletterCheckbox) {
        setNewsletter(true);
      }
    }
  };

  const postData = async (name, email, password, newsletter) => {
    try {
      const response = await axios.post(
        "https://site--vinted--dzk9mdcz57cb.code.run/user/signup",
        {
          name: name,
          email: email,
          password: password,
          newsletter: newsletter,
        }
      );
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
          Submit
        </button>
        <Link
          to="./Login.jsx"
          onClick={() => {
            setVisible(false);
          }}
        >
          Tu as déjà un compte ? Connecte-toi !
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
