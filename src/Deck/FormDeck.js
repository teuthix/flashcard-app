import React from "react";
import { Link } from "react-router-dom";
import "../Layout/index.css";

function FormDeck({ formData, handleChange, submitHandler, deck = "" }) {
  return (
    <div className="card p-5 px-6 customForm allRoundCard">
      <form onSubmit={submitHandler} className="d-flex flex-column m-4">
        <label htmlFor="name" className="form-label josefin-sans-deck">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className="mb-3 form-control"
          placeholder="Deck Name"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="description" className="form-label josefin-sans-deck">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="mb-3 form-control"
          placeholder="Deck Description"
          value={formData.description}
          onChange={handleChange}
        />
        <div className="d-flex justify-content-center">
          {deck.id ? (
            <Link to={`/decks/${deck.id}`} className="me-2">
              <button type="button" className="btn btn-secondary btn-border">
                Cancel
              </button>
            </Link>
          ) : (
            <Link to="/">
              <button type="button" className="btn btn-secondary btn-border">
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
    </div>
  );
}

export default FormDeck;
