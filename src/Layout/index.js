import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api";
import Study from "./Study";
import NewDeck from "./NewDeck";
import Deck from "./Deck";
import { Switch, Route, Link } from "react-router-dom";

function Layout() {
  const [decks, setDecks] = useState([]);

  //why no {} with this arrow function
  // const createNewDeck = (newDeck) =>
  //   setDecks((currentDecks) => [
  //     ...currentDecks,
  //     newDeck,
  //   ])
  
  useEffect(() => {
    async function fetchDecks(){
      try {
        const response = await listDecks();
        setDecks(response);
      } catch {
      }
    }
    fetchDecks();
    // console.log(fetchDecks());
  }, []);

  const eachDeck = decks.map((deck) => {
    return (
      <div className="card" key={deck.id}>
        <div className="card-body">
          <h5 className="card-title">{deck.name}</h5>
          <h6 className="card-subtitle">Cards {deck.cards.length}</h6>
          <p className="card-text">{deck.description}</p>
          <Link to={`/decks/${deck.id}`}>
            <button type="button" className="btn btn-secondary">View</button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button type="button" className="btn btn-primary">Study</button>
          </Link>
          <button type="button" className="btn btn-danger">Delete</button>
        </div>
      </div>
    )
  });

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Link to="/decks/new">
              <button type="button" className="btn btn-secondary">+ Create Deck</button>
            </Link>
            {eachDeck}
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/new">
            <NewDeck decks={decks} setDecks={setDecks} />
          </Route>
          <Route path="/decks/:deckId">
            <Deck />
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
