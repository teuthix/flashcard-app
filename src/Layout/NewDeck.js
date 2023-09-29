import React, { useState, useEffect } from "react";
import { Route, Link }  from "react-router-dom";
import { createDeck } from "../utils/api";

function NewDeck({ decks, setDecks }) {
    const initialForm = {
        name: "",
        description: ""
    };

    const [formData, setFormData] = useState({...initialForm});

    const handleChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value, });
    };

    const submitHandler = ( event ) => {
        event.preventDefault();
        // createNewDeck(formData);
    };

    //added 2 decks but dont remember what the code looked like when it worked
    useEffect(() => {
        async function newDeckMaker(formData){
            try {
                //needs parameter, but for some reason breaks code
                const newDeck = await createDeck(formData);
                setDecks({...decks, newDeck});
            } catch {
            }
        }
        newDeckMaker();
        // console.log(newDeckMaker());
    })

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
            <Link to={`/decks/`}>
                <button type="submit" className="btn btn-primary">Submit</button>
            </Link>
        </Route>
    )
};

export default NewDeck;