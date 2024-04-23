import React from "react";
import { Link } from "react-router-dom";

function FormDeck({ formData, handleChange, submitHandler, deck = "" }) {
  return (
    <form onSubmit={submitHandler} className="d-flex flex-column p-2">
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        name="name"
        className="mb-3"
        placeholder="Deck Name"
        value={formData.name}
        onChange={handleChange}
      />
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        className="mb-3"
        placeholder="Deck Description"
        value={formData.description}
        onChange={handleChange}
      />
      <div>
        {deck.id ? (
          <Link to={`/decks/${deck.id}`} className="me-2">
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
          </Link>
        ) : (
          <Link to="/">
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
          </Link>
        )}

        {deck.id ? (
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        ) : (
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        )}
      </div>
    </form>
  );
}

export default FormDeck;
