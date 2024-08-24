import React from "react";
import { Link, useParams } from "react-router-dom";

function CardForm({ formData, handleChange, handleSubmit }) {
  const params = useParams();
  const { deckId, cardId } = params;

  return (
    <div className="card customForm allRoundCard">
      <form onSubmit={handleSubmit} className="d-flex flex-column m-4">
        <label htmlFor="front" className="form-label josefin-sans-deck">
          Front
        </label>
        <textarea
          id="front"
          name="front"
          className="mb-3 form-control"
          placeholder="Front side of card"
          value={formData.front}
          onChange={handleChange}
        />
        <label htmlFor="back" className="form-label josefin-sans-deck">
          Back
        </label>
        <textarea
          id="back"
          name="back"
          className="mb-3 form-control"
          placeholder="Back side of card"
          value={formData.back}
          onChange={handleChange}
        />
        <div className="d-flex justify-content-center">
          <Link to={`/decks/${deckId}`} className="me-2">
            <button type="button" className="btn btn-secondary btn-border">
              Done
            </button>
          </Link>
          {cardId ? (
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
    </div>
  );
}

export default CardForm;
