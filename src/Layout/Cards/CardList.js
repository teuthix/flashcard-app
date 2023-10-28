import React from "react";
import { Link } from "react-router-dom";
import { deleteCard } from "../../utils/api";

function CardList({cards, deckId, setCards}) {
    // deleting turns card into empty object
    const deleteCardHandler = async (e, cardId) => {
        const text = "Delete this deck?\nYou will not be able to recover is.";
        const cardIdToDelete = e.target.id;
        // console.log(cardId);
        if(window.confirm(text)){
            if(cardIdToDelete) {
                await deleteCard(cardId);
                setCards((currentCards) => 
                currentCards.filter((card) => card.id !== cardId)
                );
            };
        };
    };

    // map cards, returning a card(bootstrap) with each card's information
    const eachCard = cards.map((eaCard, index) => { 
        // console.log(eaCard, "anything");
        return (
            <div className="card d-flex flex-column p-4" key={index}>
                <div className="d-flex justify-content-between">
                    <div>{eaCard.front}</div>
                    <div>{eaCard.back}</div>
                </div>
                <div className="d-flex justify-content-end pt-2">
                    <Link to={`/decks/${deckId}/cards/${eaCard.id}/edit`}>
                        <button type="button" className="btn btn-secondary">Edit</button>
                    </Link>
                    <div>
                        <button 
                        type="button" 
                        id={eaCard.id} 
                        onClick={(e) => deleteCardHandler(e, eaCard.id)} 
                        className="btn btn-danger">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        )
      });

      return eachCard;
}

export default CardList;