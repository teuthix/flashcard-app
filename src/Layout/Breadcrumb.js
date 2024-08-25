import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function Breadcrumb({ deck, type }) {
  let pageType;
  if (type === "newDeck") {
    pageType = "Create Deck";
  } else if (type === "deck") {
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
    <>
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
      <hr style={{ margin: 0, marginBottom: "2%" }} />
    </>
  );
}

export default Breadcrumb;
