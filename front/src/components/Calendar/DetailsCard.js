import React from 'react'
import { BiSun } from 'react-icons/bi'
import { BsMoonStars } from 'react-icons/bs'

export default function DetailsCard({...props}){
    const {data, closeCard} = props;
    const dailyCards = data.map((dailyplanning)=>{
        let icon = '';
        const time = parseInt(dailyplanning.time.split(":").join(""),10);
        (time > 1400) ? icon = <span className="daily_card_moon">< BsMoonStars/></span> : icon = <span className="daily_card_sun"><BiSun /></span>
        return (
            <div className="card" key={dailyplanning.id}>
                <div className="daily_card_icon" onClick={closeCard ? closeCard : null}
                >{icon}</div>
                <div className="card__section">
                    <span className="card__label">Date:</span>
                    <span className="card__value">{dailyplanning.date}</span>
                </div>
                <div className="card__section">
                    <span className="card__label">Time:</span>
                    <span className="card__value">{dailyplanning.time}</span>
                </div>
                <div className="card__section">
                    <span className="card__label">Company:</span>
                    <span className="card__value">{dailyplanning.company}</span>
                </div>
                <div className="card__section">
                    <span className="card__label">Company Site:</span>
                    <span className="card__value">{dailyplanning.company_site}</span>
                </div>
                {dailyplanning.yoga !== 0 && (
                    <div className="card__section">
                    <span className="card__label">Yoga:</span>
                    <span className="card__value">{dailyplanning.yoga}</span>
                    </div>
                )}
                {dailyplanning.pilates !== 0 && (
                    <div className="card__section">
                    <span className="card__label">Pilates:</span>
                    <span className="card__value">{dailyplanning.pilates}</span>
                    </div>
                )}
                {dailyplanning.other_classes !== 0 && (
                    <div className="card__section">
                    <span className="card__label">Other Classes:</span>
                    <span className="card__value">{dailyplanning.other_classes}</span>
                    </div>
                )}
                {dailyplanning.video !== 0 && (
                    <div className="card__section">
                    <span className="card__label">Video:</span>
                    <span className="card__value">{dailyplanning.video}</span>
                    </div>
                )}
                {dailyplanning.total_classes !== 0 && (
                    <div className="card__section">
                    <span className="card__label">Total Classes:</span>
                    <span className="card__value"><b>{dailyplanning.total_classes}</b></span>
                    </div>
                )}
            </div>
        )
    })    
    return (
        <>{dailyCards}</>
    )
}