import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const SignUp = ({ setVisible, setLoginVisible }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [newsletter, setNewsletter] = useState(false);
  const [preview, setPreview] = useState(null);
  const [avatar, setAvatar] = useState({});

  function MyDropzone() {
    const onDrop = useCallback((acceptedFiles) => {
      if (acceptedFiles.length > 1) {
        alert("Tu ne peux ajouter qu'un fichier.");
      } else {
        setPreview(URL.createObjectURL(acceptedFiles[0]));
        setAvatar(acceptedFiles[0]);
        console.log(acceptedFiles[0]);
      }
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    return (
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Dépose ton avatar ici ou clique pour l'ajouter</p>
        <div>
          {preview && <img src={preview} className="miniature" alt="preview" />}
        </div>
      </div>
    );
  }

  const onChange = (event, target) => {
    if (target === "username") {
      setUsername(event.target.value);
    } else if (target === "email") {
      setEmail(event.target.value);
    } else if (target === "password") {
      setPassword(event.target.value);
    } else if (target === "newsletter") {
      setNewsletter(!newsletter);
    }
  };

  const postData = async (username, email, password, newsletter, avatar) => {
    try {
      const { data } = await axios.post(
        "https://site--vinted--dzk9mdcz57cb.code.run/user/signup",
        {
          email: email,
          password: password,
          username: username,
          newsletter: newsletter,
          avatar: avatar,
        }
      );
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
          id="username"
          placeholder="Nom d'utilisateur"
          onChange={(event) => {
            onChange(event, "username");
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
        <MyDropzone />
        <button
          onClick={(event) => {
            if (username && password && email) {
              event.preventDefault();
              postData(username, email, password, newsletter, avatar);
            }
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
