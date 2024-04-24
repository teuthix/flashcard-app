import React from "react";
import { Link } from "react-router-dom";
import "../Layout/index.css";

function FormDeck({ formData, handleChange, submitHandler, deck = "" }) {
  return (
    <form onSubmit={submitHandler} className="d-flex flex-column m-4">
      <label htmlFor="name" className="customForm">
        Name
      </label>
      <input
        id="name"
        type="text"
        name="name"
        className="customForm mb-3"
        placeholder="Deck Name"
        value={formData.name}
        onChange={handleChange}
      />
      <label htmlFor="description" className="customForm">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        className="customForm mb-3"
        placeholder="Deck Description"
        value={formData.description}
        onChange={handleChange}
      />
      <div className="d-flex justify-content-center">
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
          <button type="submit" className="btn btn-primary ms-2">
            Submit
          </button>
        ) : (
          <button type="submit" className="btn btn-primary ms-2">
            Save
          </button>
        )}
      </div>
    </form>
  );
}

export default FormDeck;
