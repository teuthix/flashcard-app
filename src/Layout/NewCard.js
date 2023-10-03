import React, { useState, useEffect } from "react";
import { Route, Link, useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";

function NewCard(){
    const initialForm = {
        front: "",
        back: "",
    };
    
    const [newCard, setNewCard] = useState({...initialForm});
    // const [cardsArray, setCardsArray] = useState([]);
    const decksId = useParams().deckId;
    const history = useHistory();
    // console.log(decksId);

    const handleChange = ({target}) => {
        setNewCard({...newCard, [target.name]: target.value});
        // console.log(newCard);
    }

    // new useState for deck?
    useEffect(() => {
        async function retrieve(decksId){
            try{
                const response = await readDeck(decksId);

            } catch {};
        };
        retrieve(decksId);
        console.log(retrieve(decksId));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("we are in the handleSubmit");
        await createCard(Number(decksId), newCard);
        history.push(`/decks/${decksId}`);
    };
    
    return (
        <Route path="/decks/:deckId/cards/new">
            <h2>{}</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="front">
                Front
                <textarea 
                    id="front"
                    name="front"
                    placeholder="Front side of card"
                    value={newCard.front}
                    onChange={handleChange}
                />
            </label>
            <label htmlFor="back">
                Back
                <textarea 
                    id="back"
                    name="back"
                    placeholder="Back side of card"
                    value={newCard.back}
                    onChange={handleChange}
                />
            </label>
            <Link to={`/deck/${decksId}/`}>
                <button type="button" className="btn btn-primary">Done</button>
            </Link>
            <button type="submit" className="btn btn-secondary">Save</button>
        </form>
        </Route>
    )
}

export default NewCard;