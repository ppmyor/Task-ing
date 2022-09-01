import React from "react";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TimeTracker() {
  return (
    <div className="section-card">
      <h3 className="section-label-text">Start Time Tracker</h3>
      <input
        type="text"
        placeholder="write your scedule"
        className="mt-3 bg-white input input-bordered input-sm w-full max-w-xs"
      />
      <FontAwesomeIcon icon={faPlay} color="black" className="mt-10 text-3xl" />
    </div>
  );
}

export default TimeTracker;
