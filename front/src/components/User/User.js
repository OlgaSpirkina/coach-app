import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


export default function User(){
  console.log(this.props.match.params.id)
  return (
      <div>
        <h2>{this.props.match.params.id}</h2>
      </div>
  )
}
