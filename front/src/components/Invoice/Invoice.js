import React from 'react'
import { fetchCompaniesList, fetchSitesList } from '../../functions/companies';
import { monthObject } from '../../functions/MonthObject'
let weekdays = [null, "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

export default function Invoice({...props}){
  const [companiesList, setCompaniesList] = React.useState({});
  const [sitesList, setSitesList] = React.useState({});
  const { classes, monthIndex } = props;

  // Get two lists: companies & company sites to display them in the table
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const companies = await fetchCompaniesList();
        setCompaniesList(companies);

        const sites = await fetchSitesList();
        setSitesList(sites);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  // Create an object where we group classes done at the same company/site at the same weekday and at the same time
  const classTypes = [
    { type: 'pilates', attribute: 'pilates' },
    { type: 'yoga', attribute: 'yoga' },
    { type: 'autres', attribute: 'other_classes' },
    { type: 'vidéo', attribute: 'video' }
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

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Préstations</th>
            <th>Quantité</th>
            <th>Prix unitaire HT</th>
            <th>Total HT</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(sortedGroupedClasses).map((key, index) => {
            const classData = sortedGroupedClasses[key];
            let classType;
            (key.split("_")[0] === "autres") ? classType = "other_classes" : classType = key.split("_")[0];
            // Find all days when the classes were done
            const days = classData.reduce((day, item, index) => {
              const dayString = parseInt(item.date.split("-")[2], 10).toString();
            
              return day + dayString + (index === classData.length - 1 ? "" : " - ");
            }, "");
            // Calculate the quantity based on the class type
            const quantity = classData.reduce((count, item) => {
              if (item[classType] > 0) {
                return count + item[classType];
              }
              return count;
            }, 0);
            // Calculate price and total based on the class type and quantity
            let price, total;
            if (classType === "pilates") {
              price = 40;
              total = price * quantity;
            } else if (classType === "yoga") {
              price = 50;
              total = price * quantity;
            } else if (classType === "video") {
              price = 30;
              total = price * quantity;
            } else {
              price = 30;
              total = price * quantity;
            }

            return (
              <tr key={key}>
                <td colSpan="4" className="invoice-cell-container">
                  <span className="invoice-class-type">{key.split("_")[0]}</span> 
                  <span className="invoice-weekdays">{weekdays[key.split("_")[1]]}(s)</span>
                  <span className="invoice-days">{days}</span> 
                  <span className="invoice-month">{monthObject[monthIndex]}</span>
                  <span className="invoice-time">à {key.split("_")[4]} chez </span>
                  <span className="invoice-company">{companiesList[key.split("_")[2]]} / {sitesList[key.split("_")[3]]}</span>  
                </td>
                <td>{quantity}</td>
                <td>{price}</td>
                <td>{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
//