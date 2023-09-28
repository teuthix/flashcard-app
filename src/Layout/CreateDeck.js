import React, { useState } from "react";
import { Route, Link }  from "react-router-dom";

function CreateDeck() {
    const initialForm = {
        name: "",
        description: ""
    };

    const [formData, setFormData] = useState({...initialForm});

    // <form>
    //             <label htmlFor="front">
    //                 Front
    //                 <textarea 
    //                     id="front"
    //                     name="front"
    //                     placeholder="Front side of card"
    //                 />
    //             </label>
    //             <label htmlFor="back">
    //                 Back
    //                 <textarea 
    //                     id="front"
    //                     name="front"
    //                     placeholder="Back side of card"
    //                 />
    //             </label>
    //         </form>

    return (
        <Route path="/decks/new">
            <h6><Link to="/">Home</Link> / Create Deck</h6>
            <h3>Create Deck</h3>
            <form>
                <label htmlFor="name">
                    Name
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Deck Name" 
                    />
                </label>
                <label htmlFor="description">
                    Description
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Brief description of the deck"
                    />
                </label>
            </form>
            <button type="button" class="btn btn-secondary">Cancel</button>
            <Link to="/">
                <button type="button" class="btn btn-primary">Submit</button>
            </Link>
        </Route>
    )
};

export default CreateDeck;