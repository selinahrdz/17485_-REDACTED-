import { useNavigate } from "react-router-dom";

function NavigationBar() {
  const move = useNavigate();

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Potential want to Include Username in the Nav Bar instead of button */}
        <button
          type="button"
          className="btn btn-primary mt-25"
          onClick={() => move("/my_projects")}
        >
          {" "}
          My Projects
        </button>

        <button
          type="button"
          className="btn btn-primary mt-25"
          onClick={() => move("/create_project")}
        >
          {" "}
          Create New Project
        </button>
        <button
          type="button"
          className="btn btn-primary mt-25"
          onClick={() => move("/join_project")}
        >
          {" "}
          Join Project
        </button>
      </div>
    </nav>
  );
}

export default NavigationBar;
