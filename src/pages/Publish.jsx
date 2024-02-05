import axios from "axios";

import { useState } from "react";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

export default function Publish(props) {
  // create the useStates
  const navigate = useNavigate();
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [condition, setCondition] = useState(null);
  const [city, setCity] = useState(null);
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [pictures, setPictures] = useState(null);
  const [preview, setPreview] = useState(null);

  // create the dropzone
  function MyDropzone() {
    const onDrop = useCallback((acceptedFiles) => {
      if (acceptedFiles.length > 4) {
        alert("Tu ne peux pas ajouter plus de quatre photos.");
      } else {
        const newPictures = [];
        const objectUrl = [];
        acceptedFiles.forEach((file) => {
          const result = URL.createObjectURL(file);
          objectUrl.push(result);
          newPictures.push(file);
        });
        setPreview(objectUrl);
        setPictures(newPictures);
      }
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    return (
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Dépose tes photos ici ou clique pour les ajouter ✩</p>
        <div>
          {preview &&
            preview.map((picture, index) => {
              return (
                <img
                  key={index}
                  src={picture}
                  className="miniature"
                  alt="preview"
                />
              );
            })}
        </div>
      </div>
    );
  }
  // When we change an input, it sets the useState...
  const onChange = (event, target) => {
    if (target === "title") {
      setTitle(event.target.value);
    } else if (target === "description") {
      setDescription(event.target.value);
    } else if (target === "price") {
      setPrice(event.target.value);
    } else if (target === "condition") {
      setCondition(event.target.value);
    } else if (target === "city") {
      setCity(event.target.value);
    } else if (target === "brand") {
      setBrand(event.target.value);
    } else if (target === "size") {
      setSize(event.target.value);
    } else if (target === "color") {
      setColor(event.target.value);
    }
    // ...that was before i use dropzone...
    // else if (target === "pictures") {
    //   const newPictures = [...pictures];
    //   for (let i = 0; i < event.target.files.length; i++) {
    //     newPictures.push(event.target.files[i]);
    //   }
    //   setPictures(newPictures);
    // }
  };

  // to post the data
  const postData = async (
    title,
    description,
    price,
    condition,
    city,
    brand,
    size,
    color,
    pictures
  ) => {
    const formData = new FormData();
    for (let i = 0; i < pictures.length; i++) {
      formData.append("picturesToUpload", pictures[i]);
    }
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    try {
      const { data } = await axios.post(
        "https://site--vinted--dzk9mdcz57cb.code.run/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      );
      alert("Votre annonce a bien été créée.");
      console.log(title);
      console.log(data);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  // only if the user is logged, the publish page is displayed
  return props.token ? (
    <section className="publish">
      <h2>Vends ton article</h2>
      <form>
        <div className="add-a-picture">
          <MyDropzone />
          {/* ...that was before i use dropzone */}
          {/* <button>
            <input
              type="file"
              multiple
              onChange={(event) => {
                onChange(event, "pictures");
              }}
            />
          </button> */}
        </div>
        <div>
          <label>
            Titre ✩
            <input
              type="text"
              value={title}
              required
              placeholder="ex: Chemise Sézane verte"
              onChange={(event) => {
                onChange(event, "title");
              }}
            />
          </label>
          <label>
            Décris ton article ✩
            <input
              type="text"
              value={description}
              required
              placeholder="ex: porté quelquefois, taille correctement"
              onChange={(event) => {
                onChange(event, "description");
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Marque
            <input
              type="text"
              value={brand}
              placeholder="ex: Zara"
              onChange={(event) => {
                onChange(event, "brand");
              }}
            />
          </label>
          <label>
            Taille
            <input
              type="text"
              value={size}
              required
              placeholder="ex: L / 40 / 12"
              onChange={(event) => {
                onChange(event, "size");
              }}
            />
          </label>
          <label>
            Couleur
            <input
              type="text"
              value={color}
              placeholder="ex:Fushia"
              onChange={(event) => {
                onChange(event, "color");
              }}
            />
          </label>
          <label>
            Etat ✩
            <input
              type="text"
              value={condition}
              required
              placeholder="ex: neuf avec étiquette"
              onChange={(event) => {
                onChange(event, "condition");
              }}
            />
          </label>
          <label>
            Lieu ✩
            <input
              type="text"
              value={city}
              required
              placeholder="ex: Paris"
              onChange={(event) => {
                onChange(event, "city");
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Prix ✩
            <input
              type="text"
              value={price}
              required
              placeholder="0,00€"
              onChange={(event) => {
                onChange(event, "price");
              }}
            />
          </label>
          <label className="checkbox">
            <input type="checkbox" /> Je suis intéressé(e) par les échanges
          </label>
        </div>
      </form>
      <div className="ok">
        <button
          onClick={(event) => {
            event.preventDefault();
            if (
              title &&
              price &&
              description &&
              condition &&
              city &&
              pictures
            ) {
              postData(
                title,
                description,
                price,
                condition,
                city,
                brand,
                size,
                color,
                pictures
              );
            } else {
              alert("Tous les champs suivis d'une étoile ✩ sont obligatoires.");
            }
          }}
        >
          Ajouter
        </button>
      </div>
    </section>
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
