import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import EnoughCards from "./EnoughCards";
import NotEnough from "./NotEnough";
import Breadcrumb from "../Layout/Breadcrumb";

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
  }, [param]);

  const numberOfCards = deck.cards ? deck.cards.length : 0;

  //returns the breadcrumb nav and whichever function depending on if there are <= 3 cards
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Breadcrumb deck={deck} type="study" />
        <h3 className="josefin-sans-deck">Study: {deck.name}</h3>
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
