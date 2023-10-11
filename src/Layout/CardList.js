import { Link, useHistory } from "react-router-dom";
import { deleteCard } from "../utils/api";

function CardList({cards, deckId, setCards}) {
    const history = useHistory();

    // NEED TO REFRESH WHEN CARDS IS UPDATED
    // turns card into empty object
    const deleteCardHandler = async (e) => {
        const text = "Delete this deck?\nYou will not be able to recover is.";
        if(window.confirm(text)){
            await deleteCard(e.target.id);
            const cardies = cards.filter((card) => {
                return card.id !== e.target.id;
            });
            setCards([...cardies]);
            history.push(`/decks/${deckId}`);
            //http://localhost:3000/decks/6/
        }
    };

    // map cards, returning a card(bootstrap) with each card's information
    const eachCard = cards.map((eaCard, index) => {
        return (
            <div className="card" key={index}>
                <div>{eaCard.front}</div>
                <div>{eaCard.back}</div>
                <Link to={`/decks/${deckId}/cards/${eaCard.id}/edit`}>
                    <button type="button" className="btn btn-secondary">Edit</button>
                </Link>
                <button type="button" id={eaCard.id} onClick={deleteCardHandler} className="btn btn-danger">Delete</button>
            </div>
        )
      });

      return eachCard;
}

export default CardList;