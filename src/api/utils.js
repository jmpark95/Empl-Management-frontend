import {
   addHours,
   differenceInBusinessDays,
   differenceInMinutes,
   format,
   getDay,
   setHours,
   setMinutes,
} from "date-fns";

export function parseDate(inputDate) {
   const months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
   };

   const parts = inputDate.split(" ");
   const day = parts[0];
   const month = months[parts[1]];
   const year = parts[2];

   return `${year}-${month}-${day}`;
}

export function formatDate(inputDate) {
   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

   const parts = inputDate.split("-");
   const year = parts[0];
   const month = months[parseInt(parts[1], 10) - 1];
   const day = parts[2];

   return `${day} ${month} ${year}`;
}

export function calculateLeaveBalance(startDate) {
   const targetDate = new Date(startDate);
   const today = new Date();

   const numberOfWeeks = Math.floor((today - targetDate) / (7 * 24 * 60 * 60 * 1000)); //ms in a week

   return Math.round(numberOfWeeks * 2.92); //FT employees accrue 2.92 hours of annual leave per week
}

export function calculateLeaveMaxDate(startDate, hours) {
   if (startDate == "") {
      return "";
   }

   const formattedDate = new Date(startDate);
   const hoursAddedDate = addHours(formattedDate, hours);
   const isoFormattedDate = format(hoursAddedDate, "yyyy-MM-dd'T'HH:mm");

   return isoFormattedDate;
}

export function isWeekday(date) {
   const day = getDay(date);
   return day !== 0 && day !== 6;
}

export function calculateTotalWorkingHoursBetweenStartDateAndEndDate(startDate, endDate) {
   let totalHours = 0;
   const numberOfBusinessDays = differenceInBusinessDays(endDate, startDate);
   const lunchBreak = new Date(startDate);
   lunchBreak.setHours(13);
   lunchBreak.setMinutes(30);

   ///// 1. If leave request on same day
   if (numberOfBusinessDays === 0) {
      const hours = differenceInMinutes(endDate, startDate) / 60;
      totalHours += hours;

      if (startDate >= lunchBreak && endDate >= lunchBreak) {
         return totalHours;
      } else if (endDate >= lunchBreak) {
         totalHours -= 0.9;
         return totalHours;
      }
      return totalHours;
   }

   //2. If not, do this
   //The first day
   const endWorkingTime = setMinutes(setHours(startDate, 17), 30); // 5:30 PM
   const hours = differenceInMinutes(endWorkingTime, startDate) / 60;
   if (startDate >= lunchBreak) {
      totalHours += hours;
   } else {
      totalHours += hours - 0.9;
   }

   /////For all the days in between
   for (let i = 1; i < numberOfBusinessDays; i++) {
      totalHours += 7.6;
   }

   //The last day
   const startWorkingTime = setMinutes(setHours(endDate, 9), 0); // 9:00AM
   const difference = differenceInMinutes(endDate, startWorkingTime) / 60;
   if (endDate <= lunchBreak) {
      totalHours += difference;
      return totalHours;
   } else {
      totalHours += difference - 0.9;
      return totalHours;
   }
}

export function dateComparator(date1, date2) {
   const parsedDate1 = new Date(date1);
   const parsedDate2 = new Date(date2);

   if (parsedDate1 < parsedDate2) {
      return -1;
   }
   if (parsedDate1 > parsedDate2) {
      return 1;
   }
   return 0;
}

// //    const currentDate = new Date();
// //    const startWorkingTime = setMinutes(setHours(currentDate, 9), 0); // 9:00 AM
// //    console.log(startWorkingTime);
// //    const endWorkingTime = setMinutes(setHours(currentDate, 17), 30); // 5:30 PM
// //    console.log(endWorkingTime);
// //    const minutesDifference = differenceInMinutes(endWorkingTime, startWorkingTime);
// //    const hours = Math.floor(minutesDifference / 60);
// //    const minutes = minutesDifference % 60;
// //    console.log(`${hours} hours and ${minutes} minutes`);

// //    const currentDate = new Date();
// //    const endWorkingTime = setMinutes(setHours(currentDate, 17), 30); // 5:30 PM
// //    const minutesDifference = differenceInMinutes(endWorkingTime, currentDate);
// //    console.log(`hours: ${minutesDifference / 60}`);

// const calculateTotalWorkingHoursBetweenStartDateAndEndDate = (startDate, endDate) => {
//    let totalHours = 0;
//    let iteration = 0;
//    let currentDate = startDate;

//    //1. If leave request on same day
//    if (getDate(currentDate) === getDate(endDate)) {
//       const lunchBreak = new Date(currentDate);
//       lunchBreak.setHours(13);
//       lunchBreak.setMinutes(30);

//       const hours = differenceInMinutes(endDate, currentDate) / 60;
//       totalHours += hours;

//       if (endDate > lunchBreak) {
//          totalHours -= 0.9; //If the leave end time is after 1:30, need to minus 0.9 to factor in lunch break
//          //console.log(totalHours);
//          return totalHours;
//       }
//       //console.log(totalHours);
//       return totalHours;
//    }

//    //if its the first iteration, since the start time can be anything other than 9;00AM
//    // 5:30 minus currentDate. Then minus 0.9 for lunch break(7.6 hour work day)
//    if (iteration == 0) {
//       const endWorkingTime = setMinutes(setHours(currentDate, 17), 30); // 5:30 PM
//       const hours = differenceInMinutes(endWorkingTime, currentDate) / 60;
//       totalHours += hours - 0.9;
//       //console.log(totalHours);
//       iteration += 1;
//       currentDate = addDays(currentDate, 1);
//    }

//    if (getDate(currentDate) === getDate(endDate)) {
//       const startWorkingTime = setMinutes(setHours(currentDate, 9), 0); // 9:00AM
//       const hours = differenceInMinutes(endDate, startWorkingTime) / 60;
//       totalHours += hours - 0.9;
//       // console.log(totalHours);
//       return totalHours;
//    }

//    while (getDate(currentDate) < getDate(endDate)) {
//       if (!isWeekend(currentDate)) {
//          totalHours += 7.6; //7.6 hour working day to make a 38 hour full time working weekend
//       }

//       currentDate = addDays(currentDate, 1);
//    }

//    if (getDate(currentDate) === getDate(endDate)) {
//       const startWorkingTime = setMinutes(setHours(currentDate, 9), 0); // 9:00AM
//       const hours = differenceInMinutes(endDate, startWorkingTime) / 60;
//       totalHours += hours - 0.9;
//    }

//    //   //this is hte last iteration where the currentdate equals the enddate
//    //   //find the difference between 9:00AM and the endDate
//    //   //then add it to totalHours
//    //   const startWorkingTime = setMinutes(setHours(currentDate, 9), 0); // 9:00AM
//    //   const hours = differenceInMinutes(startWorkingTime, endDate) / 60;
//    //   totalHours = totalHours + hours;
//    //console.log(totalHours);
//    return totalHours;
// };

// //calculateTotalWorkingHoursBetweenStartDateAndEndDate(startDate, endDate);
// //console.log(calculateTotalWorkingHoursBetweenStartDateAndEndDate(startDate, endDate));
