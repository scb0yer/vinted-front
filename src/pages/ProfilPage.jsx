import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function ProfilPage(props) {
  const [preview, setPreview] = useState(null);
  const [avatar, setAvatar] = useState({});
  const [changeAvatar, setChangeAvatar] = useState(false);
  const navigate = useNavigate();

  function MyDropzone() {
    const onDrop = useCallback((acceptedFiles) => {
      if (acceptedFiles.length > 1) {
        alert("Tu ne peux ajouter qu'un fichier.");
      } else {
        acceptedFiles.forEach((file) => {
          setPreview(URL.createObjectURL(acceptedFiles[0]));
          setAvatar(acceptedFiles[0]);
        });
      }
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    return (
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Dépose tes photos ici ou clique pour les ajouter ✩</p>
        <div>
          {preview && <img src={preview} className="miniature" alt="preview" />}
        </div>
      </div>
    );
  }

  const postData = async (_id, avatar) => {
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("_id", props.userInfos[0]);
    try {
      const { data } = await axios.post(
        "https://site--vinted--dzk9mdcz57cb.code.run/user/addAvatar",
        formData
      );
      alert("Votre avatar a bien été ajouté.");
      props.userInfos[2] = data.result.secure_url;
    } catch (error) {
      console.log(error.message);
    }
  };

  return props.token ? (
    <div className="profil">
      <div>
        <div>Username :</div>
        <div>{props.userInfos[1]}</div>
      </div>
      <div>
        <div>Avatar :</div>
        <div>
          {props.userInfos[2] ? (
            <div>
              {props.userInfos[2]}
              <div>Changer d'avatar</div>
            </div>
          ) : (
            <button
              onClick={() => {
                setChangeAvatar(true);
              }}
            >
              choisir un avatar
            </button>
          )}
        </div>
      </div>
      {changeAvatar && (
        <form>
          <MyDropzone />
          <button
            onClick={(event) => {
              event.preventDefault();
              if (preview) {
                postData(props.userInfos[0], avatar);
              } else {
                alert("Il faut sélectionner une image.");
              }
            }}
          >
            Envoyer
          </button>
        </form>
      )}
      <button
        onClick={() => {
          props.setToken(null);
          props.setUserInfos([]);
          navigate("/");
        }}
      >
        Se déconnecter
      </button>
    </div>
  ) : (
    <section className="notLogged">
      <div>Vous devez vous identifier pour accéder à cette page.</div>
      <div>
        <button
          onClick={() => {
            props.setSignUpVisible(true);
          }}
        >
          S'inscrire
        </button>

        <button
          onClick={() => {
            props.setLoginVisible(true);
          }}
        >
          Se connecter
        </button>
      </div>
    </section>
  );
}
