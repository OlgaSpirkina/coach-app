import React from 'react';
import { Link } from 'react-router-dom';

export default function Trainers(){
    const [trainers, setTrainers] = React.useState([]);
    React.useEffect(() => {
        fetch("/api/trainers")
            .then(res => res.json())
            .then(data => setTrainers(data.trainers))
    }, [])

    const trainersList = trainers.map(trainer => (
        <div key={trainer.id} className="trainer-list">
            <Link to={`/trainers/${trainer.id}`}>
                <p>{trainer.name}</p>
                <p>{trainer.fname}</p>
                <p><b>{trainer.email}</b></p>
                <p><small>{trainer.mobile}</small></p>
            </Link>
        </div>)
    )
    return (
        <div id="trainer-container">
            <h1>Trainers' list</h1>
            <div id="trainer-list-parent">
                {trainersList}
            </div>
        </div>
    )
}
