import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api";
import Study from "../Study/Study";
import NewDeck from "../Deck/NewDeck";
import Deck from "../Deck/Deck";
import DecksHome from "./DecksHome";
import EditDeck from "../Deck/EditDeck";
import NewCard from "../Cards/NewCard";
import CardList from "../Cards/CardList";
import CardEdit from "../Cards/CardEdit";
// import DeckDisplay from "../Deck/DeckDisplay";
import { Switch, Route } from "react-router-dom";

import "./index.css";

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

  // header with everything else nested under it in a <Switch>
  // Home, Study, NewDeck, Deck(view), NotFound
  return (
    <>
      <Header />
      {/* <div className="container"> */}
      <Switch>
        <Route exact path="/">
          <DecksHome decks={decks} setDecks={setDecks} />
        </Route>
        <Route path="/decks/:deckId/study">
          <Study />
        </Route>
        <Route path="/decks/new">
          <NewDeck decks={decks} setDecks={setDecks} />
        </Route>
        <Route exact path="/decks/:deckId">
          <Deck setDecks={setDecks} />
        </Route>
        {/* <Route exact path="/decks/:deckId">
          <DeckDisplay setDecks={setDecks} />
        </Route> */}
        <Route path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
        <Route path="/decks/:deckId/cards/new">
          <NewCard />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <CardEdit />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      {/* </div> */}
    </>
  );
}

export default Layout;
