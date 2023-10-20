import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api";
import EditDeck from "./EditDeck";
import NewCard from "./NewCard";
import CardList from "./CardList";
import CardEdit from "./CardEdit";

function Deck({setDecks}) {
    const param = useParams().deckId;
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const history = useHistory();

    // fetches deck being targeted
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

    const deleteHandler = async (e) => {
        const text = "Delete this deck?\n\nYou will not be able to recover is.";
            if(window.confirm(text)) {
              const deleteId = Number(e.target.id);
              await deleteDeck(deleteId);
              setDecks((currentDecks) => 
                currentDecks.filter((deck) => deck.id !== deleteId)
              );
            }
        history.push("/");
    }
    
    // breadcrumb nav and deck name, description, buttons, and header for cards
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
                <button type="button" id={deck.id} onClick={deleteHandler} className="btn btn-danger">Delete</button>
            <h3>Cards</h3>
        </>

    // this page is deckDisplay and CardList
    // other pages have stuff passed in like the deck and cards
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
                <CardEdit deck={deck} setCards={setCards} />
            </Route>
       </Switch>
    )
};

export default Deck;