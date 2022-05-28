import { NavLink } from "react-router-dom";
import classes from "./Tabular.module.css";

const Tabular = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/viewTasks"
            >
              Task List
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/editTask"
            >
              Add Task
            </NavLink>
          </li>
          <li>
            <NavLink style={{fontFamily : 'Montagu Slab'}}
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/jokesSpot"
            >
              Jokes Spot
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Tabular;
