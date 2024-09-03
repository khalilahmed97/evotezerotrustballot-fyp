import React from "react";
import CustomerReview from "../CustomerReview/CustomerReview";
import "./RightSide.css";

const RightSide = () => {
  return (
    <div className="RightSide">
      <div>
        <h3>Voting Rate</h3>
        <CustomerReview />
      </div>
    </div>
  );
};

export default RightSide;
