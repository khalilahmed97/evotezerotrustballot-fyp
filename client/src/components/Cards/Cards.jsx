import React, { useEffect } from "react";
import "./Cards.css";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/Card";
import { getAllAcceptedCandidates, getAllCandidates } from "../../features/candidate/candidateSlice";
import { getAllVoters } from "../../features/voter/voterSlice";
import { UilUsersAlt, UilClipboardAlt } from "@iconscout/react-unicons";

const Cards = () => {
  const dispatch = useDispatch();
  const { acceptedCandidates, candidates } = useSelector(state => state.candidate);
  const { voters } = useSelector(state => state.voter);

  useEffect(() => {
    const fetchData = () => {
      dispatch(getAllAcceptedCandidates());
      dispatch(getAllCandidates());
      dispatch(getAllVoters());
    };

    fetchData(); // Initial fetch

    const interval = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [dispatch]);

  // Process data to get position-specific counts
  const positions = ["President", "Sr. Vice President", "Vice President", "General Secretary"];

  const getPositionCounts = (data, key) => {
    return positions.map(position => data.filter(item => item[key] === position).length);
  };

  const totalCandidatesCounts = getPositionCounts(candidates, "position_applied");
  const acceptedCandidatesCounts = getPositionCounts(acceptedCandidates, "position_applied");
  const totalVotesCounts = positions.map(position => {
    const positionCandidates = acceptedCandidates.filter(candidate => candidate.position_applied === position);
    return positionCandidates.reduce((acc, candidate) => acc + (candidate.votes || 0), 0);
  });

  return (
    <div className="Cards">
      <div className="parentContainer">
        <Card
          title="Total Candidates"
          type="Total Candidates"
          positions={positions}
          values={totalCandidatesCounts}
          color={{
            backGround: "linear-gradient(135deg, #F9F5FF 0%, #AEC6CF 100%)",
            boxShadow: "0px 10px 20px 0px #F9F5FF",
          }}
          value={totalCandidatesCounts.reduce((a, b) => a + b, 0)}
          png={UilUsersAlt}
        />
      </div>

      <div className="parentContainer">
        <Card
          title="Accepted Candidates"
          type="Accepted Candidates"
          positions={positions}
          values={acceptedCandidatesCounts}
          color={{
            backGround: "linear-gradient(135deg, #F9F5FF 0%, #AEC6CF 100%)",
            boxShadow: "0px 10px 20px 0px #F9F5FF",
          }}
          value={acceptedCandidatesCounts.reduce((a, b) => a + b, 0)}
          png={UilUsersAlt}
        />
      </div>

      <div className="parentContainer">
        <Card
          title="Total Votes"
          type="Total Votes"
          positions={positions}
          values={totalVotesCounts}
          color={{
            backGround: "linear-gradient(135deg, #F9F5FF 0%, #AEC6CF 100%)",
            boxShadow: "0px 10px 20px 0px #F9F5FF",
          }}
          value={totalVotesCounts.reduce((a, b) => a + b, 0)}
          png={UilClipboardAlt}
          chartType="bar" // Specify that this card should display a bar chart
        />
      </div>
    </div>
  );
};

export default Cards;
