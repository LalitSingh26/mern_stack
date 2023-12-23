import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }
    return (
        <div>
            <img
            className  ="logo"
             src= 'https://yt3.googleusercontent.com/ytc/AOPolaSpbKm2DF0CtKIde4QLZnbeabZON-IiDc1XqtYM0Q=s900-c-k-c0x00ffffff-no-rj'/> 
            {auth ?<ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add"> Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link>
            </ul>
            :
            <ul className="nav-ul nav-right">
                <li><Link to="/signup">sign Up</Link></li>
                <li><Link to="/login">Login </Link></li>
            </ul>
        }
        </div>
    )
}

export default Nav;