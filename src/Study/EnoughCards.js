import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function EnoughCards({ deck, numCard, setNumCard, numberOfCards }) {
  //if there are enough cards, return the card to be flipped

  const [flipped, setFlipped] = useState(false);
  const history = useHistory();

  // when flip button clicked, changes flipped boolean
  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="studyCard">
      <div className="card studyContents allRoundCard">
        {
          <h3 className="josefin-sans-deck">
            Card {numCard + 1} of {numberOfCards}
          </h3>
        }
        {deck.cards && flipped === false && <p>{deck.cards[numCard].front}</p>}
        {deck.cards && flipped === true && <p>{deck.cards[numCard].back}</p>}
        <div>
          <button
            type="button"
            onClick={handleFlip}
            className="btn btn-primary me-2"
          >
            Flip
          </button>
          {flipped === true ? (
            <button
              type="button"
              onClick={() => {
                let text =
                  "Restart cards?\nClick 'cancel' to return to the home page.";
                if (numCard < numberOfCards - 1) {
                  setNumCard(numCard + 1);
                  setFlipped(false);
                } else {
                  if (window.confirm(text) === true) {
                    history.go(0);
                  } else {
                    history.push("/");
                  }
                }
              }}
              className="btn btn-primary"
            >
              Next
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default EnoughCards;
