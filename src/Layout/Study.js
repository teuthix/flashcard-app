import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";

function Study() {
    const param = useParams().deckId;
    const [deck, setDeck] = useState({});
    const { url } = useRouteMatch();

    // console.log(param);
    useEffect(() => {
        async function readingDeck(param) {
            try {
                const response = await readDeck(param);
                setDeck(response);
            } catch {
            }
        }
        readingDeck(param);
    }, [param])

    console.log(deck);

    const deckStudy = () => {
        if (deck && deck.cards.length < 3) {
            return (
                <>
                    <h2>Not Enough Cards</h2>
                    <h6>You need at least 3 cards to study. There are {deck} cards in this deck.</h6>
                    <button type="button" class="btn btn-primary">+ Add Cards</button>
                </>
            )
        } else {
            return <h3>Study: {deck.name}</h3>
        }
    }

    return (
        <>
        <h6><Link to="/">Home</Link> / {deck.name} / Study</h6>
         {deckStudy}
        </>
    )
  };

export default Study;