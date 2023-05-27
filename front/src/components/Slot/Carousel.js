import React from 'react';
import { FcApproval } from 'react-icons/fc'
import { CiNoWaitingSign } from 'react-icons/ci'
import { GrCaretNext } from 'react-icons/gr'
import { GrCaretPrevious } from 'react-icons/gr'

const Carousel = ({ details }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? details.length - 1 : prevIndex - 1));
    
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === details.length - 1 ? 0 : prevIndex + 1));
  };
    return(
        <>
        <div className="carousel">
            <GrCaretPrevious onClick={handlePrev} className="nex-prev-carousel" />

            <div className="card-container">
                <div className="card">
                    {
                        details[currentIndex].status 
                            ? 
                        <span className="card__value">{<FcApproval className="icon-calendar-validated"/>}</span> 
                            : 
                        <span className="card__value">{<CiNoWaitingSign className="icon-calendar-waiting"/>}</span>
                    }
                    <span className="card__value">{details[currentIndex].classes}</span>
                    {details[currentIndex].date && <span className="card__value">{details[currentIndex].date.slice(0,10)}</span>}
                    {details[currentIndex].weekday && <span className="card__value">{details[currentIndex].weekday}</span>}
                    <span className="card__value">entre {details[currentIndex].from_time.slice(0,5)} et {details[currentIndex].to_time.slice(0,5)}</span>
                </div>
            
            </div>

            <GrCaretNext onClick={handleNext} className="nex-prev-carousel"/>
        </div>
        </>
    )
};

export default Carousel;

/*


*/