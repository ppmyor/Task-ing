import React from "react";
import { faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TimeTable() {
  return (
    <main className="mt-8 bg-[#DAE8DA] rounded-3xl flex justify-center items-center h-52">
      <FontAwesomeIcon icon={faChevronCircleLeft} color="#4E944F" className="arrow-btn -mr-3" />
      <div className="py-20 w-11/12 bg-white rounded-3xl"></div>
      <FontAwesomeIcon icon={faChevronCircleRight} color="#4E944F" className="arrow-btn -ml-3" />
    </main>
  );
}

export default TimeTable;
