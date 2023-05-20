import React from 'react'
import { FaBeer } from 'react-icons/fa'

export default function DetailsCalendar({ ...props }) {
    const {data, onUnmount} = props;
    console.log("Details");
    console.log(props.data);
  
    React.useEffect(() => {
      return () => {
        // Perform any cleanup or additional logic before unmounting
        //onUnmount();
      };
    }, [onUnmount]);
  
    return (
      <div>
        <h1>{props.data[0].id}</h1>
      </div>
    );
  }