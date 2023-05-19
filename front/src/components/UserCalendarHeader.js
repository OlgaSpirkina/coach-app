import React from 'react'
import { NavLink } from 'react-router-dom'
import { monthObject } from '../functions/MonthObject'
//
export default function UserCalendarHeader({props}){
    return props.map(prop => (
        <NavLink
            
            className =
            {
                (({isActive}) => (isActive) ? "active-link user-calendar-link" : "user-calendar-link")
            }
                id={`month_${prop}`}
                key={prop}
                to={{
                    pathname:`${prop}` 
                }}
            >
            {monthObject[prop]} 
        </NavLink>
    ))
    
}