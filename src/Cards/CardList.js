import React from "react";
import { Link } from "react-router-dom";
import { deleteCard } from "../utils/api";

function CardList({ cards, deckId, setCards }) {
  // used in Deck.js to list all cards of the deck
  // deleting turns card into empty object
  const deleteCardHandler = async (e, cardId) => {
    const text = "Delete this deck?\nYou will not be able to recover is.";
    const cardIdToDelete = e.target.id;
    if (window.confirm(text)) {
      if (cardIdToDelete) {
        await deleteCard(cardId);
        setCards((currentCards) =>
          currentCards.filter((card) => card.id !== cardId)
        );
      }
    }
  };

  let count = 0;
  let cardStyle;

  // map cards, returning each card's information
  const eachCard = cards.map((eaCard, index) => {
    count++;
    // if odd, 15 50, if even 50, 15
    if (count % 2) {
      // there is a remainder / count is odd
      cardStyle = "rcorners3";
    } else {
      cardStyle = "reversercorner";
    }

    return (
      <div className={`card d-flex p-4 mb-3 item ${cardStyle}`} key={index}>
        <div className="p-3">
          <div>{eaCard.front}</div>
          <div>{eaCard.back}</div>
        </div>
        <div className="d-flex justify-content-end p-2">
          <Link to={`/decks/${deckId}/cards/${eaCard.id}/edit`}>
            <button type="button" className="btn btn-primary">
              Edit
            </button>
          </Link>
          <div className="ps-2">
            <button
              type="button"
              id={eaCard.id}
              onClick={(e) => deleteCardHandler(e, eaCard.id)}
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
    <div className="d-flex flex-row mt-5">
      <div className="container">{eachCard}</div>
    </div>
  );
}

export default CardList;
