import React, { useState } from "react";
import { Route, Link, useHistory } from "react-router-dom";
import { updateDeck } from "../utils/api";

function EditDeck({deck, setDeck}) {
    const [formData, setFormData] = useState({name: deck.name, description: deck.description, id: deck.id, cards: []});
    const history = useHistory();

    // if theres any change, update the formData
    const handleChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value });
    };
    // console.log(deck);
    
    const submitHandler = async ( event ) => {
        event.preventDefault();
        setDeck({...formData});
        await updateDeck(deck);
        // setDecks({...decks, deck});
        history.push(`/decks/${deck.id}`);
    };

    return (
        <Route path="/decks/:deckId/edit">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
              </ol>
            </nav>
            <h3>Edit Deck</h3>
            <form onSubmit={submitHandler}>
                <label htmlFor="name">
                    Name
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder={deck.name}
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="description">
                    Description
                    <textarea
                        id="description"
                        name="description"
                        placeholder={deck.description}
                        value={formData.description}
                        onChange={handleChange}
                    />
                </label>
            <Link to={`/decks/${deck.id}`}>
                <button type="button" className="btn btn-secondary">Cancel</button>
            </Link>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </Route>
    )
};

export default EditDeck;