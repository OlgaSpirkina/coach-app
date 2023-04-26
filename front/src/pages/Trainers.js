import React from 'react';

export default function Trainers(){
    const [trainers, setTrainers] = React.useState([]);
    React.useEffect(() => {
        fetch("/api/trainers")
            .then(res => res.json())
            .then(data => setTrainers(data.trainers))
    }, [])

    const trainersList = trainers.map(trainer => (
        <div key={trainer.id} className="trainer-list">
            <p>{trainer.name}</p>
            <p>{trainer.fname}</p>
            <p><b>{trainer.email}</b></p>
            <p><small>{trainer.mobile}</small></p>
        </div>)
    )
    return (
        <>
            <h1>Trainers' list</h1>
            {trainersList}
        </>
    )
}
