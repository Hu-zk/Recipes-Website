import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './style.css'

function SideMenu({setCreateVisible, isCreateVisible,setSearchVisible, isSearchVisible}) {
    const navigation = useNavigate();


    const handleLogout = () => {
        localStorage.clear();
        // window.location.href='http://localhost:3000/'
        navigation("/");
    }

    const navActive = ({ isActive }) => {
        return {
            color: isActive ? "#f43f5e" : null,
        };
    };

    return (
        <div id="side-menu">

            <div className="insta-title">
                Foody
            </div>

            <div className="menu-section">

                <NavLink style={navActive} end to="/user" >
                    <div className="menu-pages">
                        <div className="menu-titles">
                            <i className="fa-solid fa-house menu-icons "></i>
                        </div>
                        <h4>Home</h4>
                    </div>
                </NavLink>

                <NavLink style={navActive} end to="/user" >
                    <div className="menu-pages" onClick={() => setSearchVisible(!isSearchVisible)}>
                        <div className="menu-titles">
                        <i className="fa-solid fa-magnifying-glass menu-icons"></i>
                        </div>
                        <h4>Search</h4>
                    </div>
                </NavLink>

                <NavLink style={navActive} end to="/user/favourites" >
                    <div className="menu-pages">
                        <div className="menu-titles">
                        <i className="fa-regular fa-heart menu-icons"></i>
                        </div>
                        <h4>Favoutites</h4>
                    </div>
                </NavLink>

                <NavLink style={navActive} end to="/user/create" >
                    <div className="menu-pages" onClick={() => setCreateVisible(!isCreateVisible)} >
                        <div className="menu-titles">
                        <i className="fa-regular fa-square-plus menu-icons"></i>
                        </div>
                        <h4>Create</h4>
                    </div>
                </NavLink>

            </div>

                <div className="menu-pages" onClick={handleLogout}>
                    <div className="menu-titles">
                    <i className="fa-solid fa-right-from-bracket menu-icons"></i>
                    </div>
                    <h4>Logout</h4>
                </div>
        </div>
    )
}

export default SideMenu