import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="d-flex">
      <div className="container">
        <div className=" text-white">
          <Link to="/" className="link-light link-underline-opacity-0">
            <h1 className="display-4">Flashcard-o-matic</h1>
          </Link>
          <p className="lead">Discover The Flashcard Difference.</p>
        </div>
        <Link to="/decks/new" className="align-self-center">
          <button type="button" className="btn btn-secondary">
            + Create Deck
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
