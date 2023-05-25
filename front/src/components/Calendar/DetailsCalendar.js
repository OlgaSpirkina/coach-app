import React from 'react'
import { useParams } from 'react-router-dom'
import DetailsCard from './DetailsCard'


export default function DetailsCalendar({ data }) {
  const params = useParams();
  const [hideHeading, setHideHeading] = React.useState(true);
  React.useEffect(() => {
    setHideHeading(false); // Hide the card with a daily planning when params.monthid changes
  }, [params.monthid]);
  function closeCard(){
    setHideHeading(false);
  }
  React.useEffect(() => {
    setHideHeading(true); // Show the card with a daily planning on component mount
  }, [data]);
  
  return (
    <section>
      {
        hideHeading && 
        <div className="daily_card_container">
          <DetailsCard data={data} closeCard={closeCard}/>
        </div>
      }
    </section>
  );
}