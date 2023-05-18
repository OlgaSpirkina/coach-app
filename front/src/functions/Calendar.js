import { monthObject } from "./MonthObject";

const months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ];
  const daynames = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi"
  ];
// Find how many weeks are in the year, how many days and days of week for the whole year
export default function findWeeksInYear(year){
    let month = {};
    for(let i=0; i<=11; i++){  
      month[i] = 32 - new Date(year, i, 32).getDate();
    }
    return findAllWeeks(month, year);
}

// Create calendar by month
let objectForAllMonths = {}
let countDaysInMonth = 0
let countWeeks = 0;
let weeksInYear = {};

function findAllWeeks(month, year){
  let arrOfWeeksInYear = [];
  for(const themonth in month){
    for(let i=1; i<=month[themonth]; i++){
      if(new Date(year, themonth, i).getDay() === 1)countWeeks++;
      weeksInYear.week = countWeeks;
      weeksInYear.year = year;
      weeksInYear.monthOfYear = new Date(year, themonth, i).getMonth();
      weeksInYear.dayInMonth = new Date(year, themonth, i).getDate();
      weeksInYear.monthName = months[new Date(year, themonth, i).getMonth()];
      weeksInYear.dayweek = new Date(year, themonth, i).getDay();
      weeksInYear.dayname = daynames[new Date(year, themonth, i).getDay()];
      arrOfWeeksInYear.push(weeksInYear);
      weeksInYear = {};
    }
  }
  countWeeks = 0;
  return arrOfWeeksInYear;

};