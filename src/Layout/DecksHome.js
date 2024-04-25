import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";
import "./index.css";

function DecksHome({ decks, setDecks }) {
  // fetches list of decks to be displayed
  useEffect(() => {
    async function fetchDecks() {
      const response = await listDecks();
      console.log("0000000000");
      setDecks(response);
    }
    fetchDecks();
  }, [setDecks]);

  // handles clicking delete, warning message pops up
  // sets deck to new array of decks with deleted id deck filtered out
  const handleClick = async (event) => {
    const text = "Delete this deck?\n\nYou will not be able to recover is.";
    if (window.confirm(text)) {
      const deleteId = Number(event.target.id);
      await deleteDeck(deleteId);
      const deckies = decks.filter((deck) => {
        return deck.id !== deleteId;
      });
      setDecks([...deckies]);
    }
  };

  let count = 0;
  let cardStyle;

  //returns each deck as a card in this format
  const eachDeck = decks.map((deck) => {
    count++;
    // if odd, radius 15 50, if even 50, 15
    if (count % 2) {
      // there is a remainder / count is odd
      cardStyle = "rcorners3";
    } else {
      cardStyle = "reversercorner";
    }

    // let cardCount = await;

    // console.log(deck);
    return (
      <div className={`card d-flex p-4 mb-4 item ${cardStyle}`} key={deck.id}>
        <div className="card-body">
          <h5 className="card-title">{deck.name}</h5>
          <h6 className="card-subtitle">
            {deck.cards ? deck.cards.length : "0"} cards
          </h6>
          <p className="card-text">{deck.description}</p>
          <div className="d-flex justify-content-between">
            <div>
              <Link to={`/decks/${deck.id}`} className="me-2">
                <button type="button" className="btn btn-primary">
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
      <div className="container">{eachDeck}</div>
    </div>
  );
}

export default DecksHome;
