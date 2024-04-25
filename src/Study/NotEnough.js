function NotEnough({ numberOfCards }) {
  // if there aren't enough cards, return this page
  return (
    <div className="customForm">
      <div className="card p-5 allRoundCard">
        <h4>Not enough cards!</h4>
        <p>
          You need at least 3 cards to study. There are {numberOfCards + 1}{" "}
          cards in this deck.
        </p>
      </div>
    </div>
  );
}

export default NotEnough;
