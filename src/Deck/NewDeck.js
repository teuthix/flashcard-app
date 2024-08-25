import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import FormDeck from "./FormDeck";
import Breadcrumb from "../Layout/Breadcrumb";

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
    history.push(`/decks/${newDeck.id}`);
  };

  // let deck = 1;

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center m-4">
        <Breadcrumb type="newDeck" />
        <h2 className="josefin-sans-deck">Create Deck</h2>
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
