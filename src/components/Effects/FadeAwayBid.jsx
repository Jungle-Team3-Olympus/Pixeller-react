import React, { useState, useEffect } from "react";
import "./FadeAwayBid.css";

const FadeAwayBid = ({ bidPrice, setBidPrice }) => {
  const [bidPriceEffect, setBidPriceEffect] = useState(bidPrice);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  }, []);

  return (
    <div className="fade-away-bid">
      {showMessage && (
        <div className={`fade-away-bid-message ${showMessage ? 'fade-in' : 'fade-out'}`}>{bidPrice}</div>
      )}
    </div>
  );
};

export default FadeAwayBid;
