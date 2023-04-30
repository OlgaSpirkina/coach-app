import React from 'react'
import { Outlet } from 'react-router'
import UserHeader from './UserHeader'

export default function User(){
    return (
    <>
        <UserHeader />
        <Outlet />
    </>
    )
}