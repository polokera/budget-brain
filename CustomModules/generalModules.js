import * as Datefns from "date-fns";

export function AddComas(value){
    //this formats numbers and adds comas to them e.g 1100 to 1,100
        const str = String(value)
        const numeric = str.replace(/[^0-9]/g,'');
        //removes all non numbers including commas
        const formatted = numeric.replace(/\B(?=(\d{3})+(?!\d))/g,",")
        //formats the values at this point there should be no previous commas 
        //if there are commas it wont work thats why we have to remove commas at first.
        return formatted;
}

export function removeCommas(value){
    //this removes commas from a value
    //for math functions, values with commas will not work properly 
    //so we need to remove the commas
    const cleanValue = Number(String(value).replace(/,/g,""))
    return cleanValue;
}

export function fixTimes(dirtyTime,dirtyDate){
    const cleanTime = Datefns.parse(dirtyTime, "HHmm", new Date());
    const dateToday = Datefns.parse(dirtyDate, "yyyy-MM-dd", new Date());
    if (Datefns.isToday(dateToday)) {
      const timeNow = new Date();
      if (Datefns.differenceInMinutes(timeNow, cleanTime) < 60) {
        const differenceInMinutes = Datefns.differenceInMinutes(
          timeNow,
          cleanTime
        );
        if (differenceInMinutes < 1) {
          return "Just Now";
        } else if (differenceInMinutes == 1) {
          return "1 minute ago";
        } else {
          return `${differenceInMinutes} minutes ago`
        }
      } else {
        const differenceInHours = Datefns.differenceInHours(timeNow, cleanTime);
        const string = differenceInHours > 1 ? "hours" : "hour";
        return `${differenceInHours} ${string} ago`
      }
    } else {
      return Datefns.format(cleanTime, "HH:mm")
    }
}

export function fixDates(dirtyDate){
const cleanDate = Datefns.parse(dirtyDate, "yyyy-MM-dd", new Date());
    if (Datefns.isToday(cleanDate)) {
      return "Aujourd'hui";
      //change to english
    } else if (Datefns.isYesterday(cleanDate)) {
      return "Hier";
      //change to english
    } else if (Datefns.isThisWeek(cleanDate)) {
      //console.log(Datefns.getDay(cleanDate))
      switch (Datefns.getDay(cleanDate)) {
        case 0:
          return "Sunday";
        case 1:
          return "Monday";
        case 2:
          return "Tuesday";
        case 3:
          return "Wednesday";
        case 4:
          return "Thursday";
        case 5:
          return "Friday";
        case 6:
          return "Saturday";
        default:
          break;
      }
    } else {
      return (Datefns.format(cleanDate, "dd/MM/yy"));
    }
}

export function fixAmounts(dirtyAmount){

}