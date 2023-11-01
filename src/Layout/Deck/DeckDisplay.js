import React from "react";
import { Link } from "react-router-dom";

function DeckDisplay({deck, deleteHandler}) {
    console.log("///////");
    return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
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
            <button type="button" id={deck.id} onClick={deleteHandler} className="btn btn-danger">Delete</button>
        <h3 className="pt-4 pb-2">Cards</h3>
    </>
    )
};

export default DeckDisplay;