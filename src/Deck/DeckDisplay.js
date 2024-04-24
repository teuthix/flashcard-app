import React from "react";
import { Link, useHistory } from "react-router-dom";

function DeckDisplay({ deck, deleteHandler }) {
  // html for /decks/:deckId
  const history = useHistory();
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center  m-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <div>
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => history.push(`/decks/${deck.id}/edit`)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-primary me-2"
            onClick={() => history.push(`/decks/${deck.id}/study`)}
          >
            Study
          </button>
          <button
            type="button"
            className="btn btn-primary me-2"
            onClick={() => history.push(`/decks/${deck.id}/cards/new`)}
          >
            + Add Cards
          </button>
          <button
            type="button"
            id={deck.id}
            onClick={deleteHandler}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default DeckDisplay;
