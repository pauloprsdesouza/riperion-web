import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAutenticatedUser, logout } from "../../authorization/jwt-token";
import { routes } from "../../routes/routes";

const NavBar: React.FC = () => {
    const [user, setUser] = useState<any>();

    useEffect(() => {
        setUser(getAutenticatedUser());
    }, []);

    function getUser(): any {
        return user ? <span>{user}</span> : null;
    }

    function renderizeNavbar() {
        return user ? <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
            <div className="container">
                <a className="navbar-brand" href="/">E-Nutrition</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        {
                            routes.map((route, index) => (
                                <li key={index} className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={route.path}>{route.name}</Link>
                                </li>
                            ))
                        }
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <button type="button" className="nav-link dropdown-toggle btn btn-link" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                {getUser()}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                <li><button type="button" className="dropdown-item btn btn-link" onClick={() => {
                                    logout();
                                    window.location.href = "/";
                                }}>Logout</button></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav> : null;
    }

    return (<>
        {renderizeNavbar()}
    </>
    )
}

export default NavBar;