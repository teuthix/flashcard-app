import React, { useState } from "react";
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

    const handleChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value, });
    };

const submitHandler = async ( event ) => {
    event.preventDefault();
    const newDeck = await createDeck(formData);
    setDecks([...decks, newDeck]);
    history.push(`/decks/${newDeck.id}`);
    };

    return (
        <Route path="/decks/new">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
              </ol>
            </nav>
            <h3>Create Deck</h3>
            <form onSubmit={submitHandler} onChange={handleChange}>
                <label htmlFor="name">
                    Name
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Deck Name" 
                        value={formData.name}
                        
                    />
                </label>
                <label htmlFor="description">
                    Description
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Brief description of the deck"
                        value={formData.description}
                        // onChange={handleChange}
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