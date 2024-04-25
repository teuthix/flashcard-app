import React from "react";
import { Link, useHistory } from "react-router-dom";

function DeckDisplay({ deck, deleteHandler }) {
  // html for /decks/:deckId
  const history = useHistory();

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ marginBottom: "none" }}>
            <li className="breadcrumb-item">
              <Link to="/" className="breadcrumb-link">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>
        <hr style={{ margin: 0, marginBottom: "2%" }} />
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <div className="mt-4">
          <button
            type="button"
            className="btn btn-primary me-2"
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
