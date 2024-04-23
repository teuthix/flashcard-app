import React from "react";
import { Link, useParams } from "react-router-dom";

function CardForm({ formData, handleChange, handleSubmit }) {
  const params = useParams();
  const { deckId, cardId } = params;

  return (
    <>
      <form onSubmit={handleSubmit} className="d-flex flex-column p-2">
        <label htmlFor="front">Front</label>
        <textarea
          id="front"
          name="front"
          className="mb-3"
          placeholder="Front side of card"
          value={formData.front}
          onChange={handleChange}
        />
        <label htmlFor="back">Back</label>
        <textarea
          id="back"
          name="back"
          className="mb-3"
          placeholder="Back side of card"
          value={formData.back}
          onChange={handleChange}
        />
        <div>
          <Link to={`/decks/${deckId}`}>
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
