import { ReactNode } from "react";

import { Link } from "react-router-dom";

export interface menuProps {
  routes: routeProps[];
}

interface routeProps {
  id: string;
  path: string;
  element: ReactNode;
  children: routeProps[];
}

export function Menu({ routes }: menuProps) {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary border-bottom border-bottom-dark"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link
          key={routes[0].id}
          className="navbar-brand"
          to={routes[0].path}
        >
          {routes[0].id}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          key="navbarNav"
        >
          <ul key={"ul"} className="navbar-nav">
            {routes[0].children.map((route: any) =>
              route.canActivate ? (
                <li id={route.id} key={route.id + "-li"} className="nav-item">
                  <Link
                    id={route.id}
                    key={route.id + "-link"}
                    className="nav-link"
                    to={route.path}
                  >
                    {route.id}
                  </Link>
                </li>
              ) : (
                <li key={"-link"}></li>
              )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
