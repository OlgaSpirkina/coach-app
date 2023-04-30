import React from 'react'
import { Outlet } from 'react-router'
import UserCalendarHeader from '../pages/User/UserCalendarHeader'

export default function UserCalendarLayout(){
    return (
    <>
        <UserCalendarHeader />
        <Outlet />
    </>
    )
}