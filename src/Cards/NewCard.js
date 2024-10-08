import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import CardForm from "./CardForm";
import Breadcrumb from "../Layout/Breadcrumb";

function NewCard() {
  //initial state of the form is a blank card
  const initialForm = {
    front: "",
    back: "",
  };

  const [deck, setDeck] = useState({ cards: [] });
  const [formData, setFormData] = useState({ ...initialForm });
  const decksId = useParams().deckId;

  // fetch deck being targeted
  useEffect(() => {
    async function fetchDeck(decksId) {
      const response = await readDeck(decksId);
      setDeck(response);
    }
    fetchDeck(decksId);
  }, [decksId]);

  // on change, update the formData
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  // on submit, use the createCard api and reset newCard to a blank form
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCard(Number(decksId), formData);
    setFormData({ ...initialForm });
  };

  // return a breadcrumb nav and a form
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Breadcrumb deck={deck} type="newCard" />
        <h3 className="josefin-sans-deck">{deck.name}: Add Card</h3>
        <CardForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

export default NewCard;
