import React, { useState, useEffect } from "react";
import { Route, Link, useHistory }  from "react-router-dom";
import { createDeck } from "../utils/api";

// decks is all decks being rendered from index
function NewDeck({ decks, setDecks }) {
    const initialForm = {
        name: "",
        description: ""
    };

    const history = useHistory();
    const [formData, setFormData] = useState({...initialForm});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value, });
    };
    
    useEffect(() => {
        async function newDeckMaker(formData){
            if (submitted) {
                try {
                    const newDeck = await createDeck(formData);
                    setDecks([...decks, newDeck]);
                    history.push(`/decks/${newDeck.id}`);
                } catch (error) {
                }
            }
        }
        newDeckMaker(formData);
    });

    const submitHandler = ( event ) => {
        event.preventDefault();
        setSubmitted(!submitted);
    };

    return (
        <Route path="/decks/new">
            <h6><Link to="/">Home</Link> / Create Deck</h6>
            <h3>Create Deck</h3>
            <form onSubmit={submitHandler}>
                <label htmlFor="name">
                    Name
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Deck Name" 
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="description">
                    Description
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Brief description of the deck"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </label>
            <Link to="/">
                <button type="button" className="btn btn-secondary">Cancel</button>
            </Link>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </Route>
    )
};

export default NewDeck;