import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header(){
    return (
        <header>
            <NavLink to="/">#Fit et Sens</NavLink>
            <nav>
                <NavLink 
                    className={({isActive})=> isActive ? "active-link" : ""}
                    to="/user">User</NavLink>
                <NavLink 
                    className={({isActive})=> isActive ? "active-link" : ""}
                    to="/about">About</NavLink>
                <NavLink 
                    className={({isActive})=> isActive ? "active-link" : ""}
                    to="/trainers">Trainers</NavLink>
            </nav>
        </header>
    )
}