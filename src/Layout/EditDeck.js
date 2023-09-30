import React, { useEffect, useState } from "react";
import { Route, Link, useParams } from "react-router-dom";
import { updateDeck } from "../utils/api";

function EditDeck({deck, setDeck}) {
    const param = useParams().deckId;
    console.log(param);

    // form empty state
    const initialForm = {
        name: "",
        description: ""
    };

    const [formData, setFormData] = useState({...initialForm});

    // if theres any change, update the formData
    const handleChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value, });
    };

    const submitHandler = ( event ) => {
        event.preventDefault();
        // createNewDeck(formData);
        setFormData(...initialForm)
    };

    useEffect(() => {
        async function updateIt(param) {
            try{
                const response = await updateDeck(param);
                setDeck(response)
            } catch {}
        }
        updateIt(param)
        console.log(deck);
    });

    return (
        <Route path="/decks/:deckId/edit">
            <h6><Link to="/">Home</Link> / {deck.name} / Edit Deck</h6>
            <h3>Create Deck</h3>
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
            </form>
            <Link to="/">
                <button type="button" className="btn btn-secondary">Cancel</button>
            </Link>
            <Link to={`/decks/${param}`}>
                <button type="submit" className="btn btn-primary">Submit</button>
            </Link>
        </Route>
    )
};

export default EditDeck;