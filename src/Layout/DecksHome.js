import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function DecksHome({ decks, handleClick }) {
  //returns each deck as a card in this format
  const eachDeck = decks.map((deck) => {
    return (
      <div className="card d-flex p-2 mb-3 item" key={deck.id}>
        <div className="card-body">
          <h5 className="card-title">{deck.name}</h5>
          <h6 className="card-subtitle">
            {deck.cards ? deck.cards.length : "0"} cards
          </h6>
          <p className="card-text">{deck.description}</p>
          <div className="d-flex justify-content-between">
            <div>
              <Link to={`/decks/${deck.id}`}>
                <button type="button" className="btn btn-secondary">
                  View
                </button>
              </Link>
              <Link to={`/decks/${deck.id}/study`}>
                <button type="button" className="btn btn-primary">
                  Study
                </button>
              </Link>
            </div>
            <button
              type="button"
              id={deck.id}
              onClick={handleClick}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row">
      {/* <h3 className="border border-5 p-4 mx-5 w-25 align-self-start">
        All Decks
      </h3> */}
      <div className="container">{eachDeck}</div>
    </div>
  );
}

export default DecksHome;
