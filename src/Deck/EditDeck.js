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
      const response = await readDeck(param);
      setDeck(response);
      setFormData(response);
    }
    readingDeck(param);
  }, [param]);

  // if theres any change, update the formData
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  //   use updateDeck to update the deck
  //   history.push sends user to deck page
  const submitHandler = async (event) => {
    event.preventDefault();
    await updateDeck(formData);
    history.push(`/decks/${deck.id}`);
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center m-4">
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
        <h2 className="josefin-sans-deck">Edit Deck</h2>
      </div>
      <FormDeck
        formData={formData}
        handleChange={handleChange}
        submitHandler={submitHandler}
        deck={formData}
      />
    </>
  );
}

export default EditDeck;
