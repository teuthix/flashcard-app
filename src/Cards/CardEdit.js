import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import CardForm from "./CardForm";

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
      try {
        const response = await readDeck(deckId);
        setDeck(response);
      } catch {}
    }
    readingDeck(deckId);
  }, [deckId]);

  // REQUIRED fetches targeted card which fills in form initially
  useEffect(() => {
    async function fetchCard(cardId) {
      try {
        const response = await readCard(cardId);
        setEditCard(response);
        setFormData({ ...response });
      } catch {}
    }
    fetchCard(cardId);
  }, [cardId]);

  // on change, update the formData
  const handleChange = ({ target }) => {
    setFormData({ ...editCard, [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard(formData);
    history.push(`/decks/${deck.id}`);
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {editCard.id}
          </li>
        </ol>
      </nav>
      <h4>Edit Card</h4>
      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default CardEdit;
