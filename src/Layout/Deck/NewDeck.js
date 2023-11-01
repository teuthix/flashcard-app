import React, { useState } from "react";
import { Link, useHistory }  from "react-router-dom";
import { createDeck } from "../../utils/api";

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
    console.log(newDeck);
    setDecks([...decks, newDeck]);
    history.push(`/decks/${newDeck.id}`);
    };

    return (
        <>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
              </ol>
            </nav>
            <h3>Create Deck</h3>
            <form onSubmit={submitHandler} className="d-flex flex-column">
                <label htmlFor="name">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    className="mb-3"
                    placeholder="Deck Name" 
                    value={formData.name}
                    onChange={handleChange}
                />
                <label htmlFor="description">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    className="mb-3"
                    placeholder="Brief description of the deck"
                    value={formData.description}
                    onChange={handleChange}
                />
                <div className="d-flex">
                    <Link to="/">
                        <button type="button" className="btn btn-secondary">Cancel</button>
                    </Link>
                    <div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </>
    )
};

export default NewDeck;