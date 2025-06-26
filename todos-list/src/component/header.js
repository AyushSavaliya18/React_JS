import React from "react";
import PropTypes from "prop-types";

export default function Header(props) {
  const headerStyle = {
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "20px",
    position: "sticky",
    top: "0",

  };

  return (
    <div style={headerStyle}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="/todos-list/src/App.js">
            {props.title}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/todos-list/src/App.js"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/todos-list/src/App.js">
                  About
                </a>
              </li>
            </ul>
            {props.searchBar ? (
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search your todos..."
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            ) : (
              <span className="text-muted">No search bar available</span>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

Header.defaultProps = {
  title: "Title is Here",
  searchBar: false,
};

Header.propTypes = {
  title: PropTypes.string,
  searchBar: PropTypes.bool.isRequired,
};
