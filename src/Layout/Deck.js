import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import EditDeck from "./EditDeck";
import NewCard from "./NewCard";
import CardList from "./CardList";
import CardEdit from "./CardEdit";

function Deck() {
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
    }, [param]);
    
    
      const deckDisplay =  
        <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
          </ol>
        </nav>
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
        </>

    return (
       <Switch>
            <Route exact path="/decks/:deckId">
                {deckDisplay}
                <CardList cards={cards} deckId={param} setCards={setCards}/>
            </Route>
            <Route path="/decks/:deckId/edit">
                <EditDeck deck={deck} setDeck={setDeck}/>
            </Route>
            <Route path="/decks/:deckId/cards/new">
                <NewCard cards={cards} setCards={setCards} />
            </Route>
            <Route path="/decks/:deckId/cards/:cardId/edit">
                <CardEdit deck={deck} deckId={param}/>
            </Route>
       </Switch>
    )
};

export default Deck;