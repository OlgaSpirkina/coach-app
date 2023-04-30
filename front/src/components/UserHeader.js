import React from 'react'
import { NavLink } from 'react-router-dom'

export default function UserHeader(){
    return (
        <nav>
            <NavLink 
            to="/user" 
            end
            className={({isActive}) => isActive ? "active-link" : ""}
            >Dashboard</NavLink>
            <NavLink 
            to="/user/company" 
            className={({isActive}) => isActive ? "active-link" : ""}
            >Company</NavLink>
            <NavLink 
            to="/user/calendar" 
            className={({isActive}) => isActive ? "active-link" : ""}
            >Calendar</NavLink>
        </nav>
    )
}