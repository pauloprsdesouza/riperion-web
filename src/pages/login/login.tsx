import React from "react";
import { Outlet } from "react-router-dom";
import "./login.css"

const LoginPage: React.FC = () => {
    return (<div>

        <Outlet />

    </div>)
}

export default LoginPage;