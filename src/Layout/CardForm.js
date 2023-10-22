// import { useState} from "react";
import { Link, useParams } from "react-router-dom"

function CardForm({formData, handleChange, handleSubmit}) {
    const params = useParams();
    const { cardId } = params;
    const { deckId } = params;
    // console.log(formData);

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