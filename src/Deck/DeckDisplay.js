import React from "react";
import { Link, useHistory } from "react-router-dom";

function DeckDisplay({ deck, deleteHandler }) {
  const history = useHistory();
  return (
    <>
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
      <header>
        <h5>{deck.name}</h5>
        <p>{deck.description}</p>
      </header>
      <button
        type="button"
        className="btn btn-secondary me-2"
        onClick={() => history.push(`/decks/${deck.id}/edit`)}
      >
        Edit
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => history.push(`/decks/${deck.id}/study`)}
      >
        Study
      </button>
      <button
        type="button"
        className="btn btn-primary"
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
      <h3 className="pt-4 pb-2">Cards</h3>
    </>
  );
}

export default DeckDisplay;
