import React, { useState, useEffect } from "react";
import { Switch, Route, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "../../utils/api";
import EditDeck from "./EditDeck";
import NewCard from "../Cards/NewCard";
import CardList from "../Cards/CardList";
import CardEdit from "../Cards/CardEdit";
import DeckDisplay from "./DeckDisplay";

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
    
    // this page is deckDisplay and CardList
    // other pages have stuff passed in like the deck and cards
    return (
       <Switch>
            <Route exact path="/decks/:deckId">
                {cards.length ? 
                <>
                <DeckDisplay deck={deck} deleteHandler={deleteHandler} />
                <CardList cards={cards} deckId={param} setCards={setCards}/>
                </>
                 : ""}
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