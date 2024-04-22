import React from "react";
import { Link } from "react-router-dom";

function FormDeck({ formData, handleChange, submitHandler, deck }) {
  return (
    <form onSubmit={submitHandler} className="d-flex flex-column p-2">
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        name="name"
        className="mb-3"
        placeholder={deck.name ? deck.name : "Deck Name"}
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
  );
}

export default FormDeck;
