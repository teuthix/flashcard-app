import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { updateDeck } from "../utils/api";

function EditDeck({ deck, setDeck }) {
  const [formData, setFormData] = useState({
    name: deck.name,
    description: deck.description,
    id: deck.id,
    cards: [],
  });
  const history = useHistory();

  useEffect(() => {
    setFormData(deck);
  }, [deck]);

  // if theres any change, update the formData
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  // on submit, set the deck variable to whatever is in formData
  // use updateDeck to update the deck
  // history.push sends user to deck page
  const submitHandler = async (event) => {
    event.preventDefault();
    setDeck({ ...formData });
    await updateDeck(deck);
    history.push(`/decks/${deck.id}`);
  };

  // return breadcrumb nav, and the form to edit the deck
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
            Edit Deck
          </li>
        </ol>
      </nav>
      <h3>Edit Deck</h3>
      <form onSubmit={submitHandler} className="d-flex flex-column p-2">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          className="mb-3"
          placeholder={deck.name}
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="mb-3"
          placeholder={deck.description}
          value={formData.description}
          onChange={handleChange}
        />
        <div>
          <Link to={`/decks/${deck.id}`} className="me-2">
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
          </Link>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default EditDeck;
