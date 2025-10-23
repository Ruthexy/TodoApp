import { Link } from "react-router-dom";
import "./App.css";
import type React from "react";
import CalendarCard from "./CalendarCard";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to your todo app📑</h1>
      <p className="home-description">
        Productivity starts here — prioritise, plan, and accomplish.
      </p>
      <CalendarCard />
      <Link to="/todos" className="home-link">
        Click here to get started
      </Link>
    </div>
  );
}

export default Home;
