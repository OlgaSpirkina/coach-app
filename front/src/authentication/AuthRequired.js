import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function AuthRequired({cookieValue}){
    if(!cookieValue){
        console.log("not loged in");
        return <Navigate to="/login" replace/>
    }
    return  <Outlet />
    
}