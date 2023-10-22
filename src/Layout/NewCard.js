import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import CardForm from "./CardForm";

function NewCard({cards, setCards}){
    //initial state of the form is a blank card
    const initialForm = {
        front: "",
        back: "",
    };

    const [deck, setDeck] = useState({cards: []});
    const [formData, setFormData] = useState({...initialForm});
    const decksId = useParams().deckId;

    // fetch deck being targeted
    useEffect(() => {
        async function fetchDeck(decksId){
                const response = await readDeck(decksId);
                setDeck(response);
        };
        fetchDeck(decksId);
    }, [decksId]);

    // on change, update the formData
    const handleChange = ({target}) => {
        setFormData({...formData, [target.name]: target.value});
    }

    // on submit, use the createCard api and reset newCard to a blank form
    const handleSubmit = async (event) => {
        event.preventDefault();
        const madeCard = await createCard(Number(decksId), formData);
        setCards([...cards, madeCard]);
        setFormData({...initialForm});
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
            <CardForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        </>
    )
}

export default NewCard;
