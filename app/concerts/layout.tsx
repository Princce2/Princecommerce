import { Outlet, NavLink } from "react-router";

export default function ConcertsLayout() {
    return (
        <div className="bg-green-600 min-h-screen py-5 px-10">
            <nav>
                <NavLink to="/concerts">Concerts</NavLink>{" "}
                <NavLink to="/concerts/trending">Trending</NavLink>
            </nav>
            <hr />
            <Outlet />
        </div>
    )
}