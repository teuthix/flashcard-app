import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function DeckDisplay({ deck, setDecks }) {
  const history = useHistory();

  const deleteHandler = async (e) => {
    const text = "Delete this deck?\n\nYou will not be able to recover is.";
    if (window.confirm(text)) {
      const deleteId = Number(e.target.id);
      await deleteDeck(deleteId);
      setDecks((currentDecks) =>
        currentDecks.filter((deck) => deck.id !== deleteId)
      );
    }
    history.push("/");
  };

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
      <Link to={`/decks/${deck.id}/edit`}>
        <button type="button" className="btn btn-secondary me-2">
          Edit
        </button>
      </Link>
      <Link to={`/decks/${deck.id}/study`}>
        <button type="button" className="btn btn-primary">
          Study
        </button>
      </Link>
      <Link to={`/decks/${deck.id}/cards/new`}>
        <button type="button" className="btn btn-primary">
          + Add Cards
        </button>
      </Link>
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
