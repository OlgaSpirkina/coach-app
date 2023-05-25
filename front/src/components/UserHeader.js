import React from 'react'
import { NavLink } from 'react-router-dom'

export default function UserHeader(){
    return (
        <nav>
            <NavLink 
                to="/user" 
                end
                className={({isActive}) => isActive ? "active-link" : ""}
                >Acceuil
            </NavLink>
            <NavLink 
                to="/user/slot" 
                className={({isActive}) => isActive ? "active-link" : ""}
                >Créneaux 
            </NavLink>
            <NavLink 
                to="/user/calendar" 
                className={({isActive}) => isActive ? "active-link" : ""}
                >Calendrier
            </NavLink>
        </nav>
    )
}