import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";
import FormDeck from "./FormDeck";

function EditDeck() {
  const param = useParams().deckId;
  const [deck, setDeck] = useState({});
  const history = useHistory();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    id: "",
    cards: [],
  });

  // fetches deck being targeted
  useEffect(() => {
    async function readingDeck(param) {
      try {
        const response = await readDeck(param);
        setDeck(response);
        setFormData(response);
        // console.log(formData);
      } catch {}
    }
    readingDeck(param);
  }, [param]);

  // if theres any change, update the formData
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  //   on submit, set the deck variable to whatever is in formData
  //   use updateDeck to update the deck
  //   history.push sends user to deck page
  const submitHandler = async (event) => {
    event.preventDefault();
    setDeck({ ...formData });
    await updateDeck(deck);
    history.push(`/decks/${deck.id}`);
  };

  //   return <p>etetsdf</p>;

  // return breadcrumb nav, and the form to edit the deck
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h3>Edit Deck</h3>
      <FormDeck
        formData={formData}
        handleChange={handleChange}
        submitHandler={submitHandler}
        deck={deck}
      />
    </>
  );
}

export default EditDeck;
