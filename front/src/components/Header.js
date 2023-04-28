import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(){
    return (
        <header>
            <Link to="/">#Fit et Sens</Link>
            <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/trainers">Trainers</Link>
            </nav>
        </header>
    )
}