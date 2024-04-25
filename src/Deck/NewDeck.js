import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import FormDeck from "./FormDeck";

// decks is all decks being rendered from index
function NewDeck() {
  const initialForm = {
    name: "",
    description: "",
  };

  const history = useHistory();
  const [formData, setFormData] = useState({ ...initialForm });

  // updates formData with every change
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  // on clicking submit, create new deck from formData
  const submitHandler = async (event) => {
    event.preventDefault();
    let newDeck = await createDeck(formData);
    // console.log(newDeck);
    history.push(`/decks/${newDeck.id}`);
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center m-4">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Create Deck
            </li>
          </ol>
        </nav>
        <h2>Create Deck</h2>
      </div>
      <FormDeck
        formData={formData}
        handleChange={handleChange}
        submitHandler={submitHandler}
      />
    </>
  );
}

export default NewDeck;
