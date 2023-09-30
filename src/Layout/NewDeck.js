import React, { useState, useEffect, useRef } from "react";
import { Route, Link, useHistory }  from "react-router-dom";
import { createDeck } from "../utils/api";




// ======= NOT WORKING =========





function NewDeck({ decks, setDecks }) {
    const initialForm = {
        name: "",
        description: ""
    };

    const history = useHistory();
    const [formData, setFormData] = useState({...initialForm});

    const handleChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value, });
    };
    
    let newDeckId = useRef(0);
    useEffect(() => {
        async function newDeckMaker(formData){
            try {
                const newDeck = await createDeck(formData);
                setDecks({...decks, newDeck});
                newDeckId.current = newDeck.id;
                console.log(newDeckId.current);
            } catch {
            }
        }
        newDeckMaker(formData);
    }, [formData, setDecks]);

    const submitHandler = ( event ) => {
        event.preventDefault();
        // createNewDeck(formData);
        setFormData(initialForm);
        history.push(`/decks/${newDeckId.current}`);
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
            </form>
            <Link to="/">
                <button type="button" className="btn btn-secondary">Cancel</button>
            </Link>
                <button type="submit" className="btn btn-primary">Submit</button>
        </Route>
    )
};

export default NewDeck;