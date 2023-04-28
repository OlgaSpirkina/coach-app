import React from 'react';
import { useParams } from 'react-router-dom'

export default function TrainerDetails(){
    const params = useParams()
    const [trainer, setTrainer] = React.useState(null);
    React.useEffect(()=>{
        fetch(`/api/trainers/${params.id}`)
            .then(res => res.json())
            .then(data => setTrainer(data.trainers[0]))
    }, [params.id])
    
    return(
        <div id="trainer-container">
            {trainer ? (
                <div className="trainer-list">
                    <h2>{trainer.name} {trainer.fname}</h2>
                    <p>{trainer.email}</p>
                    <p><i>{trainer.mobile}</i></p>
                </div>

            ) : <h2>Loading... </h2>}
        </div>
    )
}