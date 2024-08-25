import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function Breadcrumb({ deck, type }) {
  let pageType;
  // if new deck/card, set pageType to "Create Deck/Card"
  // if deck, set pageType to deck name
  // if deck/card edit, set pageType to "Edit Deck/Card"
  //   console.log(deck);
  //   console.log(deck, type);
  if (type === "newDeck") {
    pageType = "Create Deck";
  } else if (type === "deck") {
    // console.log(type);
    pageType = deck.name;
  } else if (type === "editDeck") {
    pageType = "Edit Deck";
  } else if (type === "study") {
    pageType = "Study";
  } else if (type === "editCard") {
    pageType = "Edit Card";
  } else if (type === "newCard") {
    pageType = "New Card";
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb" style={{ marginBottom: "none" }}>
        <li className="breadcrumb-item">
          <Link to="/" className="breadcrumb-link">
            Home
          </Link>
        </li>
        {type === "editDeck" ||
        type === "study" ||
        type === "newCard" ||
        type === "editCard" ? (
          <li className="breadcrumb-item" aria-current="page">
            <Link to={`/decks/${deck.id}`} className="breadcrumb-link">
              {deck.name}
            </Link>
          </li>
        ) : (
          ""
        )}
        <li className="breadcrumb-item active" aria-current="page">
          {pageType}
        </li>
      </ol>
    </nav>
  );
}

export default Breadcrumb;
