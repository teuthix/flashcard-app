import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { Link, useParams, useHistory } from "react-router-dom";

function Study() {
    const param = useParams().deckId;
    const [deck, setDeck] = useState({});
    const [flipped, setFlipped] = useState(false);
    const [numCard, setNumCard] = useState(0);
    const history = useHistory();
    
    // when flip button clicked, changes flipped boolean
    const handleFlip = () => {
        setFlipped(!flipped);
    };
    
    // api fetches deck being targeted
    useEffect(() => {
        async function readingDeck(param) {
            try {
                const response = await readDeck(param);
                setDeck(response);
            } catch {
            }
        }
        readingDeck(param);
        // console.log(readingDeck(param));
    }, [param])

    const numberOfCards = deck.cards ? deck.cards.length : 0;

    //if there are enough cards, return the card to be flipped
    const enoughCards = () => {
        return (
            <div className="card">
                {<h3>Card {numCard + 1} of {numberOfCards}</h3>}
                {deck.cards && flipped === false && <p>{deck.cards[numCard].front}</p>}
                {deck.cards && flipped === true && <p>{deck.cards[numCard].back}</p>}
                <button type="button" onClick={handleFlip} className="btn btn-secondary">Flip</button>
                {flipped === true ? <button 
                    type="button" 
                    onClick={() => {
                        let text = "Restart cards?\nClick 'cancel' to return to the home page.";
                        if(numCard < numberOfCards - 1){
                            setNumCard(numCard+1);
                            setFlipped(false);
                            console.log(numCard);
                        } else{
                            if(window.confirm(text) === true ){
                                history.go(0);
                            } else {
                                history.push("/");
                            }
                        }
                    }}
                    className="btn btn-primary">
                        Next
                </button> : ""}
            </div>
        );
    };

    // if there aren't enough cards, return this page
    const notEnoughCards = () => {
        return (
            <>
                <h4>Not enough cards.</h4>
                <p>You need at least 3 cards to study. There are {numberOfCards+1} cards in this deck.</p>
            </>
        )
    }
    
    //returns the breadcrumb nav and whichever function depending on if there are <= 3 cards
    return (
        <>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Study</li>
              </ol>
            </nav>
            <h3>Study: {deck.name}</h3>
            {(numberOfCards < 3) ? notEnoughCards() : enoughCards()}
            
        </>
    )
};

export default Study;