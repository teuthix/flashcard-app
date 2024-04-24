import React from "react";
import { Link, useParams } from "react-router-dom";

function CardForm({ formData, handleChange, handleSubmit }) {
  const params = useParams();
  const { deckId, cardId } = params;

  return (
    <>
      <form onSubmit={handleSubmit} className="d-flex flex-column m-4">
        <label htmlFor="front" className="customForm">
          Front
        </label>
        <textarea
          id="front"
          name="front"
          className="mb-3 customForm"
          placeholder="Front side of card"
          value={formData.front}
          onChange={handleChange}
        />
        <label htmlFor="back" className="customForm">
          Back
        </label>
        <textarea
          id="back"
          name="back"
          className="mb-3 customForm"
          placeholder="Back side of card"
          value={formData.back}
          onChange={handleChange}
        />
        <div className="d-flex justify-content-center">
          <Link to={`/decks/${deckId}`} className="me-2">
            <button type="button" className="btn btn-secondary">
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
    </>
  );
}

export default CardForm;
