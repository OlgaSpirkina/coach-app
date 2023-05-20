import React from 'react'

const classes = [
    {choose_month: 4,
    choose_years: 2023,
    company_id: 5,
    date: "2023-04-03",
    id: 195,
    other_classes: 1,
    pilates: 1,
    site_id: 6,
    time: "12:00",
    total_classes: 2,
    trainer_id: 1,
    video: 0,
    yoga: 0},
    
    
    {choose_month: 4,
    choose_years: 2023,
    company_id: 6,
    date: "2023-04-06",
    id: 199,
    other_classes: 0,
    pilates: 0,
    site_id: 9,
    time: "18:15",
    total_classes: 2,
    trainer_id: 1,
    video: 0,
    yoga: 2,
    },
    {choose_month: 4,
    choose_years: 2023,
    company_id: 5,
    date: "2023-04-10",
    id: 196,
    other_classes: 1,
    pilates: 1,
    site_id: 6,
    time: "12:00",
    total_classes: 2,
    trainer_id: 1,
    video: 0,
    yoga: 0},
    {
    choose_month: 4,
    choose_years: 2023,
    company_id: 6,
    date: "2023-04-13",
    id: 200,
    other_classes: 0,
    pilates: 0,
    site_id: 9,
    time: "18:15",
    total_classes: 2,
    trainer_id: 1,
    video: 0,
    yoga: 2},

    {choose_month: 4,
    choose_years: 2023,
    company_id: 5,
    date: "2023-04-17",
    id: 197,
    other_classes: 1,
    pilates: 1,
    site_id: 6,
    time: "12:00",
    total_classes: 2,
    trainer_id: 1,
    video: 0,
    yoga: 0},
    

    {choose_month: 4,
    choose_years: 2023,
    company_id: 6,
    date: "2023-04-20",
    id: 201,
    other_classes: 0,
    pilates: 0,
    site_id: 9,
    time: "18:15",
    total_classes: 2,
    trainer_id: 1,
    video: 0,
    yoga: 2},
    

    {choose_month: 4,
    choose_years: 2023,
    company_id: 5,
    date: "2023-04-24",
    id: 198,
    other_classes: 1,
    pilates: 1,
    site_id: 6,
    time: "12:00",
    total_classes: 2,
    trainer_id: 1,
    video: 0,
    yoga: 0},
    

    {choose_month: 4,
    choose_years: 2023,
    company_id: 6,
    date: "2023-04-27",
    id: 202,
    other_classes: 0,
    pilates: 0,
    site_id: 9,
    time: "18:15",
    total_classes: 2,
    trainer_id: 1,
    video: 0,
    yoga: 2}
];

export default function UserCompany(){
    const classTypes = [
        { type: 'pilates', attribute: 'pilates' },
        { type: 'yoga', attribute: 'yoga' },
        { type: 'otherclasses', attribute: 'other_classes' },
        { type: 'video', attribute: 'video' }
      ];
    
      const groupedClasses = classes.reduce((result, classObj) => {
        const { date, company_id, site_id, time } = classObj;
        const classDate = new Date(date);
        let weekday = classDate.getDay();
        
        // Adjust Sunday to be the last day (6 instead of 0)
        if (weekday === 0) {
          weekday = 7;
        }
    
        classTypes.forEach(({ type, attribute }) => {
          const classCount = classObj[attribute];
          if (classCount > 0) {
            const classKey = `${type}_${weekday}_${company_id}_${site_id}_${time}`;
            if (!result[classKey]) {
              result[classKey] = [];
            }
            result[classKey].push(classObj);
          }
        });
    
        return result;
    }, {});
    
      // Sort the keys by weekday (with Sunday as the last day)
    const sortedKeys = Object.keys(groupedClasses).sort((keyA, keyB) => {
        const weekdayA = parseInt(keyA.split('_')[1]);
        const weekdayB = parseInt(keyB.split('_')[1]);
        
        // Adjust Sunday to be the last day (6 instead of 0)
        const adjustedWeekdayA = weekdayA === 0 ? 7 : weekdayA;
        const adjustedWeekdayB = weekdayB === 0 ? 7 : weekdayB;
    
        return adjustedWeekdayA - adjustedWeekdayB;
    });
    
      // Create a new object with sorted keys
    const sortedGroupedClasses = sortedKeys.reduce((sortedResult, key) => {
        sortedResult[key] = groupedClasses[key];
        return sortedResult;
    }, {});
    
    console.log(sortedGroupedClasses);

    const Table = () => {
        return (
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Site</th>
                  <th>Jour de la semaine</th>
                  <th>Heure</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(groupedClasses).map((key) => (
                  <tr key={key}>
                    <td>{key.split("_")[1]}</td>
                    <td>{key.split("_")[2]}</td>
                    <td>{key.split("_")[0]}</td>
                    <td>{key.split("_")[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
    }
    return (
        <>
            <div>
               
            </div>
        </>
        
    )
}