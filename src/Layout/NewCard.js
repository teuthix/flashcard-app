import React from "react";

function NewCard(){
    const initialForm = {
        front: "",
        back: "",
    };

    
    return (
        <form>
            <label htmlFor="front">
                Front
                <textarea 
                    id="front"
                    name="front"
                    placeholder="Front side of card"
                />
            </label>
            <label htmlFor="back">
                Back
                <textarea 
                    id="front"
                    name="front"
                    placeholder="Back side of card"
                />
            </label>
        </form>
    )
}

export default NewCard;