import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
//import Form from './components/Form/Form'

function App(){
  return(
    <>
    <h1>Hello World!</h1>
    </>
  )
  
}

export default App
// <Form />
/*
  const [bData, setBData] = useState([{}])

  useEffect(()=>{
    fetch("/api/1").then(
      response => response.json()
    ).then(
      data => {
        setBData(data)
      }
    ).catch(err => console.error(err))
  }, [])

  return(
    <div>
    {(typeof bData.trainers === "undefined") ? (
      <p>Loading...</p>
    ): (
      
      bData.trainers.map((trainer, index) => (
        <p key={index}>{trainer.fname} {trainer.name}</p>
      ))
    )}
    </div>
  )
  */