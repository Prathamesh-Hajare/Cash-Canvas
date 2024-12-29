import React from 'react'
import styled from 'styled-components'
import avatar from '../../img/avatar.png'
import brand from "../../img/brand.png"
import { signout } from '../../utils/Icons'
import { menuItems } from '../../utils/menuItems'
import { useAuth } from '../../context/auth'
import toast from "react-hot-toast";
import { NavLink } from 'react-router-dom'

function Navigation({ name, active, setActive }) {
    const [auth, setAuth] = useAuth();

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
    };

    return (
        <NavStyled>
            <div className="user-con">
                <img src={avatar} alt="User Avatar" />
                <div className="text">
                    <img className="brand-img" src={brand} alt="Brand" />
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return (
                        <li
                            key={item.id}
                            onClick={() => setActive(item.id)}
                            className={active === item.id ? 'active' : ''}
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </li>
                    );
                })}
            </ul>
            <div className="bottom-nav">
                <li>
                    <NavLink onClick={handleLogout} to="/login">
                        {signout} Sign Out
                    </NavLink>
                </li>
            </div>
        </NavStyled>
    )
}




const NavStyled = styled.nav`
padding: 2rem 1.5rem;
width: 374px;
height: 100%;
background: rgba(252, 246, 249, 0.78);
border: 3px solid #FFFFFF;
backdrop-filter: blur(4.5px);
border-radius: 32px;
display: flex;
flex-direction: column;
justify-content: space-between;
gap: 2rem;

.user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        background: #fcf6f9;
        border: 2px solid #FFFFFF;
        padding: .2rem;
        box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }

    .text {
        display: flex;
        flex-direction: column;
        justify-content: center;

        h2 {
            color: rgba(34, 34, 96, 1);
            margin: 0;
            font-size: 1.2rem;
        }

        p {
            color: rgba(34, 34, 96, .6);
            margin: 0;
            font-size: 0.9rem;
        }
        
        .brand-img {
            width: 200px; /* Adjust to fit your needs */
            height: 90px;  /* Adjust to fit your needs */
            object-fit: contain;
            margin-top: 1.5rem;
            border-radius:30%;
            margin:0.1rem;
        }
    }
}

.menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;

    li {
        display: grid;
        grid-template-columns: 40px auto;
        align-items: center;
        margin: .6rem 0;
        font-weight: 500;
        cursor: pointer;
        transition: all .4s ease-in-out;
        color: rgba(34, 34, 96, .6);
        padding-left: 1rem;
        position: relative;

        i {
            color: rgba(34, 34, 96, 0.6);
            font-size: 1.4rem;
            transition: all .4s ease-in-out;
        }
    }
}

.active {
    color: rgba(34, 34, 96, 1) !important;

    i {
        color: rgba(34, 34, 96, 1) !important;
    }

    &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background: #222260;
        border-radius: 0 10px 10px 0;
    }
}

.bottom-nav {
    li {
        list-style: none;
    }

    a {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
        color: rgba(34, 34, 96, 1);
        font-weight: 500;
        transition: color 0.3s ease;

        &:hover {
            color: rgba(34, 34, 96, 0.8);
        }
    }
}
`;
export default Navigation