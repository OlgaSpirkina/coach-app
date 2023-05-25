import React from 'react'
import DetailsCard from '../../components/Calendar/DetailsCard'


//
export default function UserDashboard() {
    const firstUpdate = React.useRef(true);
    const [twoDaysPlanning, setTwoDaysPlanning] = React.useState({});
  
    React.useEffect(() => {
      if (firstUpdate.current) {
        fetch("/dashboard")
          .then(res => res.json())
          .then(data => {
            console.log("Fetched data:", data); // Log the received data
            setTwoDaysPlanning(data.dashboard);
            firstUpdate.current = false;
          })
          .catch(error => {
            console.error("Error fetching data:", error);
          });
      }
    }, []);
  
    console.log("Planning:", twoDaysPlanning);
  
    return (
      <>
        {Object.keys(twoDaysPlanning).length > 0 && (
          <>
            <div className="two-days-planning two-days-planning-today">
            {twoDaysPlanning.today.length > 0
                ?
                <>
                    <h3>Les cours d'aujourd'hui</h3>
                    <DetailsCard data={twoDaysPlanning.today} closeCard={null} />
                </>
                :
                <p>Aucun cours n'est programmé aujourd'hui</p>
            }
              
            </div>
            <div className="two-days-planning two-days-planning-tomorrow">
            {twoDaysPlanning.tomorrow.length > 0 
                ? 
                <>
                    <h3>Les cours de demain</h3>
                    <DetailsCard data={twoDaysPlanning.tomorrow} closeCard={null} />
                </>
                :
                <p>Aucun cours n'est programmé demain</p>
            }
            </div>
          </>
        )}
      </>
    );
}