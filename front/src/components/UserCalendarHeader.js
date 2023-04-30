import React from 'react'
import { NavLink } from 'react-router-dom'
import { monthObject } from '../functions/MonthObject'

const currentMonth = new Date().getMonth()+1;
export default function UserCalendarHeader({props}){
    return props.map(prop => (
        <NavLink
        className =
        {
            (({isActive}) => (isActive) ? "active-link" : "")
        }
            key={prop}
            to={{
                pathname:`${prop}` 
            }}
        >
           {monthObject[prop]} 
         </NavLink>
    ))
    
}