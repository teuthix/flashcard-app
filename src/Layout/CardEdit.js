import React, { useEffect, useState} from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readCard, updateCard } from "../utils/api";

function CardEdit({deck, deckId}) {
    const cardId = useParams().cardId;
    const [card, setCard] = useState([]);
    const history = useHistory();

    // REQUIRED (passing in from CardList)
    // useEffect(() => {
    //     async function readingDeck(deckId) {
    //         try {
    //             const response = await readDeck(deckId);
    //             setDeck(response);
    //         } catch {
    //         }
    //     }
    //     readingDeck(deckId);
    // }, [deckId]);

    const [formData, setFormData] = useState({});
    // REQUIRED
    useEffect(() => {
        async function fetchCard(cardId) {
            try {
                const response = await readCard(cardId);
                setCard(response);
                setFormData({...response});
            } catch{}
        }
            fetchCard(cardId);
    }, [cardId]);

    const handleChange = ({ target }) => {
        setFormData({...card, [target.name]: target.value, });
    };

    const submitHandler = async ( event ) => {
        event.preventDefault();
        await updateCard(formData);
        history.push(`/decks/${deck.id}`);
        };

    return (
        <>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Edit Card {card.id}</li>
            </ol>
          </nav>
        <h4>Edit Card</h4>
        <form onSubmit={submitHandler}>
                <label htmlFor="front">
                    Front
                    <textarea
                        id="front"
                        name="front" 
                        value={formData.front}
                        placeholder={card.front}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="back">
                    Back
                    <textarea
                        id="back"
                        name="back"
                        value={formData.back}
                        placeholder={card.back}
                        onChange={handleChange}
                    />
                </label>
                <Link to={`/decks/${deckId}`}>
                    <button type="button" className="btn btn-secondary">Done</button>
                </Link>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
      </>
    )
}

export default CardEdit;