import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    // <header className="jumbotron bg-dark">
    <header className="d-flex bg-dark mb-4 p-4">
      <div className="container">
        <div className=" text-white">
          <h1 className="display-4">Flashcard-o-matic</h1>
          <p className="lead">Discover The Flashcard Difference.</p>
        </div>
        <Link to="/decks/new">
          <button type="button" className="btn btn-secondary">
            + Create Deck
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
