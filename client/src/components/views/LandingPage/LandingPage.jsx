import React from "react";
import logoImage from "../../../utils/assets/tasking_logo.png";
import UserCalendar from "./Section/UserCalendar";
import TotalWorkingTime from "./Section/TotalWorkingTime";
import TimeTracker from "./Section/TimeTracker";
import ToDo from "./Section/ToDo";
import TimeTable from "./Section/TimeTable";
import UserProfile from "./Section/UserProfile";

const LandingPage = () => {
  return (
    <div className="w-full h-screen pt-6 px-24">
      <header className="flex justify-between">
        <img src={logoImage} alt="task-ing logo" className="w-30 sm:w-30 md:w-44 lg:w-56" />
        <UserProfile />
      </header>

      <h2 className="mt-8 text-[30px] font-semibold toggle-text-color">Anna님, 오늘 하루도 화이팅!</h2>
      <TimeTable />

      <div className="flex flex-row justify-between mt-12 h-[450px]">
        <section>
          {/* todo */}
          <ToDo />
        </section>

        <section className="flex flex-col">
          {/* timer, time tracker */}
          <TimeTracker />
          <TotalWorkingTime />
        </section>

        <section className="flex flex-col">
          {/* 달력 */}
          <UserCalendar />
          <button className="btn bg-slate-100 border-none px-14 mt-10 mx-10 ml-auto w-24">Logout</button>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
