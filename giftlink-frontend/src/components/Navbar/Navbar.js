import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from '../../context/AuthContext';

export default function Navbar() {
    const { isLoggedIn, setIsLoggedIn, userName, setUserName } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("auth-token");
        const storedName = sessionStorage.getItem("name");
        if (token && storedName) {
            setIsLoggedIn(true);
            setUserName(storedName);
        }
    }, [setIsLoggedIn, setUserName]);

    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        setIsLoggedIn(false);
        setUserName("");
        navigate("/app/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">GiftLink</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">

                    <li className="nav-item">
                        <Link className="nav-link" to="/app">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/app">Gifts</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/app/search">Search</Link>
                    </li>

                    {isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                {/* 🔹 Ahora Welcome es un link a Profile */}
                                <Link className="nav-link" to="/app/profile">
                                    Welcome, {userName}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-success ms-2" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/app/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/app/register">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
