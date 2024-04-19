import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks, deleteDeck } from "../utils/api";
import Study from "../Study/Study";
import NewDeck from "../Deck/NewDeck";
import Deck from "../Deck/Deck";
import DecksHome from "./DecksHome";
import { Switch, Route, Link } from "react-router-dom";

function Layout() {
  const [decks, setDecks] = useState([]);

  // fetches list of decks to be displayed
  useEffect(() => {
    async function fetchDecks() {
      try {
        const response = await listDecks();
        setDecks(response);
      } catch (error) {}
    }
    fetchDecks();
  }, []);

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

  // header with everything else nested under it in a <Switch>
  // Home, Study, NewDeck, Deck(view), NotFound
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Link to="/decks/new">
              <button type="button" className="btn btn-secondary">
                + Create Deck
              </button>
            </Link>
            <DecksHome decks={decks} handleClick={handleClick} />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/new">
            <NewDeck decks={decks} setDecks={setDecks} />
          </Route>
          <Route path="/decks/:deckId">
            <Deck setDecks={setDecks} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
