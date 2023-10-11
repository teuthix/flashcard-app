import React, { useEffect, useState} from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readCard, updateCard } from "../utils/api";

function CardEdit({deck, deckId, setCards}) {
    const cardId = useParams().cardId;
    const [editCard, setEditCard] = useState([]);
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
    // REQUIRED fetches targeted card which fills in form initially
    useEffect(() => {
        async function fetchCard(cardId) {
            try {
                const response = await readCard(cardId);
                setEditCard(response);
                setFormData({...response});
            } catch{}
        }
            fetchCard(cardId);
    }, [cardId]);

    // on change, update the formData
    const handleChange = ({ target }) => {
        setFormData({...editCard, [target.name]: target.value, });
        console.log(formData);
    };

    // find card by id, remove old, add new
    // if id === edit id, return edited card, else returns card
    const submitHandler = async ( event ) => {
        event.preventDefault();
        await updateCard(formData);
        // setCards((currentCards) => currentCards.forEach((eaCard) => {
        //     const newCardList = [];
        //     if(eaCard.id !== event.target.id){
        //         newCardList.push(eaCard);
        //     } else {
        //         newCardList.push(formData);
        //     }
        // }))
        history.push(`/decks/${deck.id}`);
        };

    return (
        <>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Edit Card {editCard.id}</li>
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
                        placeholder={editCard.front}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="back">
                    Back
                    <textarea
                        id="back"
                        name="back"
                        value={formData.back}
                        placeholder={editCard.back}
                        onChange={handleChange}
                    />
                </label>
                <Link to={`/decks/${deckId}`}>
                    <button type="button" className="btn btn-secondary">Done</button>
                </Link>
                <button type="submit" id={editCard.id} className="btn btn-primary">Submit</button>
            </form>
      </>
    )
}

export default CardEdit;