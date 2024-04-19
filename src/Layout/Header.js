import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    // <header className="jumbotron bg-dark">
    <header className="d-flex flex-wrap p-3 mb-4 bg-dark">
      <div className="container text-white">
        <h1 className="display-4">Flashcard-o-matic</h1>
        <p className="lead">Discover The Flashcard Difference.</p>
      </div>
      <Link to="/decks/new">
        <button type="button" className="btn btn-secondary">
          + Create Deck
        </button>
      </Link>
    </header>
  );
}

export default Header;
