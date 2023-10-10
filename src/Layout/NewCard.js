import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";

function NewCard({cards, setCards}){
    //initial state of the form is a blank card
    const initialForm = {
        front: "",
        back: "",
    };

    const [deck, setDeck] = useState({cards: []});
    const [newCard, setNewCard] = useState({...initialForm});
    const decksId = useParams().deckId;

    // fetch deck being targeted
    useEffect(() => {
        async function fetchDeck(decksId){
            try{
                const response = await readDeck(decksId);
                setDeck(response);
            } catch {};
        };
        fetchDeck(decksId);
    }, [decksId]);

    // on change, update the newCard
    const handleChange = ({target}) => {
        setNewCard({...newCard, [target.name]: target.value});
    }

    // on submit, use the createCard api and reset newCard to a blank form
    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log("we are in the handleSubmit");
        await createCard(Number(decksId), newCard);
        setCards([...cards, newCard]);
         setNewCard({...initialForm});
    };
    
    // return a breadcrumb nav and a form
    return (
        <>
        <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Add Card</li>
              </ol>
            </nav>
            <h3>{deck.name}: Add Card</h3>
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
            <Link to={`/decks/${decksId}/`}>
                <button type="button" className="btn btn-primary">Done</button>
            </Link>
            <button type="submit" className="btn btn-secondary">Save</button>
        </form>
        </>
    )
}

export default NewCard;