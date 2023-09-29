import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { Link, useParams } from "react-router-dom";

function Study() {
    const param = useParams().deckId;
    const [deck, setDeck] = useState({});
    // const { url } = useRouteMatch();

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
    const [flipped, setFlipped] = useState(false);
    const [numCard, setNumCard] = useState(0);
    const handleFlip = () => {
        setFlipped(!flipped);

    }

    return (
        <>
            <h6><Link to="/">Home</Link> / {deck.name} / Study</h6>
            <h3>Study: {deck.name}</h3>
            <div className="card">
                    {deck.cards && <h3>Card {numCard + 1} of {deck.cards.length}</h3>}
                    {deck.cards && flipped === false && <p>{deck.cards[numCard].front}</p>}
                    {deck.cards && flipped === true && <p>{deck.cards[numCard].back}</p>}
                    <button type="button" onClick={handleFlip} className="btn btn-secondary">Flip</button>
                    {flipped === true ? <button 
                    type="button" 
                    onClick={() => {
                        let text;
                        if(numCard <= deck.cards.length){
                            setNumCard(numCard+1);
                            setFlipped(false);
                        // } else if(numCard > deck.cards.length){
                        //     if(window.confirm("test") === true ){
                        //         text = "test working";
                        //     } else {
                        //         text = "test also working";
                        //     }
                        }
                    }}
                    className="btn btn-primary">
                        Next
                </button> : ""}
            </div>
        </>
    )
};

export default Study;