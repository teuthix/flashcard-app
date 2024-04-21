import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import DeckDisplay from "./DeckDisplay";
import { deleteDeck } from "../utils/api";

function Deck({ setDecks }) {
  const param = useParams().deckId;
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);

  const history = useHistory();

  const deleteHandler = async (e) => {
    const text = "Delete this deck?\n\nYou will not be able to recover is.";
    if (window.confirm(text)) {
      const deleteId = Number(e.target.id);
      await deleteDeck(deleteId);
      setDecks((currentDecks) =>
        currentDecks.filter((deck) => deck.id !== deleteId)
      );
    }
    history.push("/");
  };

  // fetches deck being targeted
  useEffect(() => {
    async function readingDeck(param) {
      try {
        const response = await readDeck(param);
        setDeck(response);
        setCards(response.cards);
      } catch {}
    }
    readingDeck(param);
  }, [param]);

  // breadcrumb nav and deck name, description, buttons, and header for cards

  // this page is deckDisplay and CardList
  // other pages have stuff passed in like the deck and cards
  return <DeckDisplay deck={deck} deleteHandler={deleteHandler} />;
}

export default Deck;
