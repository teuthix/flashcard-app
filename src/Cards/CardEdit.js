import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import CardForm from "./CardForm";
import Breadcrumb from "../Layout/Breadcrumb";

function CardEdit() {
  const params = useParams();
  const { deckId, cardId } = params;
  const [editCard, setEditCard] = useState([]);
  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({});

  const history = useHistory();

  // fetches deck being targeted
  useEffect(() => {
    async function readingDeck(deckId) {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    readingDeck(deckId);
  }, [deckId]);

  // fetches targeted card which fills in form initially
  useEffect(() => {
    async function fetchCard(cardId) {
      const response = await readCard(cardId);
      setEditCard(response);
      setFormData({ ...response });
    }
    fetchCard(cardId);
  }, [cardId]);

  // on change, update the formData
  const handleChange = ({ target }) => {
    setFormData({ ...editCard, [target.name]: target.value });
  };

  // on submit, updateCard api called and pushed to /decks/:deckId
  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard(formData);
    history.push(`/decks/${deck.id}`);
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Breadcrumb deck={deck} type="editCard" />
        <h3 className="josefin-sans-deck">Edit Card</h3>

        <CardForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
}

export default CardEdit;
