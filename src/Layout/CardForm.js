// import { useState} from "react";
import { Link, useParams } from "react-router-dom"

function CardForm({formData, handleChange, handleSubmit}) {
    const params = useParams();
    // const [changeCard, setChangeCard] = useState([]);
    const { cardId } = params;
    const { deckId } = params;
    console.log(formData);

    // if there is a cardId, show edit page
    // if there is no cardId, show new card page
    // card form is its own component
    // let valueFront = "";
    // let valueBack = "";

    // function textAreaFront() {
    //     if(cardId){
    //         return (
    //             <textarea
    //               id="front"
    //               name="front"
    //               value={formData.front}
    //               placeholder={formData.front}
    //               onChange={handleChange}
    //               />
    //         );
        // } else if(!params.cardId){
        //     temp = "rest no card Id";
    //     };

    // }

    // NEW 
    // placeholder="Back side of card"
    // value={newCard.back}

    // EDIT
    // placeholder={editCard.back}
    // value={formData.back}

    /* NEW
    const handleChange = ({target}) => {
        setNewCard({...newCard, [target.name]: target.value});
    }

    // on submit, use the createCard api and reset newCard to a blank form
    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log("we are in the handleSubmit");
        await createCard(Number(deckId), newCard);
        setCards([...cards, newCard]);
         setNewCard({...initialForm});
    };
    */

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="front">
                Front
                <textarea
                  id="front"
                  name="front"
                  placeholder="Front side of card"
                  value={formData.front}
                  onChange={handleChange}
                />
            </label>
            <label htmlFor="back">
                Back
                <textarea
                  id="back"
                  name="back"
                  placeholder="Back side of card"
                  value={formData.back}
                  onChange={handleChange}
                />
            </label>
                <Link to={`/decks/${deckId}`}>
                  <button type="button" className="btn btn-secondary">Done</button>
                </Link>
                {cardId ?
                  (<button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  ) : (<button type="submit" className="btn btn-primary">
                  Save
                </button>)
                }
        </form>
        </>
    );
};

export default CardForm;