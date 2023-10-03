import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import EditDeck from "./EditDeck";
import NewCard from "./NewCard";

function Deck({ decks, setDecks }) {
    const param = useParams().deckId;
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function readingDeck(param) {
            try {
                const response = await readDeck(param);
                setDeck(response);
                setCards(response.cards)
            } catch {
            }
        }
        readingDeck(param);
        // console.log(deck);
    }, []);

    
    const eachCard = cards.map((eaCard) => {
        return (
            <div className="card" key={eaCard.id}>
                <div>{eaCard.front}</div>
                <div>{eaCard.back}</div>
                <button type="button" className="btn btn-secondary">Edit</button>
                <button type="button" className="btn btn-danger">Delete</button>
            </div>
        )
      });
      const deckDisplay =  <>
            <h6><Link to="/">Home</Link> / {deck.name}</h6>
            <h4>{deck.name}</h4>
            <p>{deck.description}</p>
            <Link to={`/decks/${deck.id}/edit`}>
                <button type="button" className="btn btn-secondary">
                    Edit
                </button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
                <button type="button" className="btn btn-primary">
                    Study
                </button>
            </Link>
            <Link to={`/decks/${deck.id}/cards/new`}>
                <button type="button" className="btn btn-primary">
                    + Add Cards
                </button>
            </Link>
                <button type="button" className="btn btn-danger">Delete</button>
            <h3>Cards</h3>
            {eachCard}
        </>

    return (
       <Switch>
            <Route exact path="/decks/:deckId">
                {deckDisplay}
            </Route>
            <Route path="/decks/:deckId/edit">
                <EditDeck deck={deck} setDeck={setDeck}/>
            </Route>
        <Route path="/decks/:deckId/cards/new">
            <NewCard />
        </Route>
       </Switch>
    )
};

export default Deck;