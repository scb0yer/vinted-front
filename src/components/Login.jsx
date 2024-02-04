import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (event, target) => {
    if (target === "email") {
      setEmail(event.target.value);
    } else if (target === "password") {
      setPassword(event.target.value);
    }
  };
  const postData = async (email, password) => {
    try {
      const { data } = await axios.post(
        "https://site--vinted--dzk9mdcz57cb.code.run/user/login",
        {
          email: email,
          password: password,
        }
      );
      props.setLoginVisible(false);
      const token = data.token;
      Cookies.set("token", token, { expires: 0.5 }, { secure: true });
      props.setToken(token);
    } catch (error) {
      console.log(error.message);
      alert(
        "Mauvais identifiants. Veuillez rentrer l'adresse email avec laquelle vous vous êtes inscrit(e)."
      );
    }
  };
  return (
    <div
      className="modal-root"
      onClick={() => {
        props.setLoginVisible(false);
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
            setLoginVisible(false);
          }}
        >
          x
        </button>
        <h2>Se connecter</h2>
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
        <button
          onClick={(event) => {
            event.preventDefault();
            postData(email, password);
          }}
        >
          Se connecter
        </button>
        <br />
        <a
          onClick={() => {
            props.setSignUpVisible(true);
            props.setLoginVisible(false);
          }}
        >
          Pas encore de compte ? Inscris-toi !
        </a>
      </form>
    </div>
  );
};
export default Login;
