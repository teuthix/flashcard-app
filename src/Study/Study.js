import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import EnoughCards from "./EnoughCards";
import NotEnough from "./NotEnough";

function Study() {
  const param = useParams().deckId;
  const [deck, setDeck] = useState({});
  const [numCard, setNumCard] = useState(0);

  // api fetches deck being targeted
  useEffect(() => {
    async function readingDeck(param) {
      const response = await readDeck(param);
      setDeck(response);
    }
    readingDeck(param);
    // console.log(readingDeck(param));
  }, [param]);

  const numberOfCards = deck.cards ? deck.cards.length : 0;

  //returns the breadcrumb nav and whichever function depending on if there are <= 3 cards
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center m-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h2>Study: {deck.name}</h2>
      </div>
      {numberOfCards < 3 ? (
        <NotEnough numberOfCards={numberOfCards} />
      ) : (
        <EnoughCards
          deck={deck}
          numCard={numCard}
          setNumCard={setNumCard}
          numberOfCards={numberOfCards}
        />
      )}
    </>
  );
}

export default Study;
