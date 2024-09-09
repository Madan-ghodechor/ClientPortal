import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TimelogicService {

  constructor() { }

  timesData: any = [];
  TodaysDate: Date = new Date();


  generateTimes(data: any) {

    this.timesData.splice(0, this.timesData.length);    // It Will Clear All The Time Arrays Data.

    let BookingTime = this.roundTimeQuarterHour(new Date());    // this will RoundUp To the time if 11:53 then it will 11:45 
    BookingTime.setMinutes(BookingTime.getMinutes() + 240);     // to add 4 hours later

    let NextDayBookingTime1stCond = this.roundTimeQuarterHour(new Date());
    NextDayBookingTime1stCond.setHours(7);
    NextDayBookingTime1stCond.setMinutes(0);

    // Next Day Bookings
    let NextDayBookingTime = this.roundTimeQuarterHour(new Date());
    NextDayBookingTime.setHours(10);
    NextDayBookingTime.setMinutes(0);

    if (this.TodaysDate.toLocaleDateString() === data.pickupDate) {

      if (this.formatDateTimeToYYYYMMDDHHMMSS(this.TodaysDate) > '00:00:00' && this.formatDateTimeToYYYYMMDDHHMMSS(this.TodaysDate) < '07:00:00') {
        for (let i = 0; i < 96; i++) {
          BookingTime.setMinutes(BookingTime.getMinutes() + 15);
          let Time = BookingTime.toLocaleTimeString();

          if (BookingTime.getHours() == 0)
            break;
          this.timesData.push(Time)

        }
      } else if (this.formatDateTimeToYYYYMMDDHHMMSS(this.TodaysDate) >= '20:00:00' && this.formatDateTimeToYYYYMMDDHHMMSS(this.TodaysDate) < '23:59:59') {

      } else {

        for (let i = 0; i < 96; i++) {


          if (BookingTime.getHours() == 0)
            break;
          let Time = BookingTime.toLocaleTimeString();

          BookingTime.setMinutes(BookingTime.getMinutes() + 15);
          this.timesData.push(Time)
          console.log
        }
      }


    } else {
      let NdayDate = new Date();
      NdayDate.setDate(NdayDate.getDate() + 1);
      let selectedDate = this.getPreviousDate(data.pickupDate)
      let currentDate = this.getPreviousDateCheck(this.TodaysDate.toLocaleDateString())

      if (this.formatDateTimeToYYYYMMDDHHMMSS(this.TodaysDate) > '20:00:00' && currentDate == selectedDate) {
        for (let i = 0; i < 68; i++) {

          if (this.timesData > '11:45:00 PM' && this.timesData < '07:00:00 AM')
            break;

          let Time = NextDayBookingTime1stCond.toLocaleTimeString();
          NextDayBookingTime1stCond.setMinutes(NextDayBookingTime1stCond.getMinutes() + 15);
          this.timesData.push(Time)
        }

      } else {
        NextDayBookingTime1stCond.setHours(0);
        NextDayBookingTime1stCond.setMinutes(0);
        for (let i = 0; i < 96; i++) {

          let Time = NextDayBookingTime1stCond.toLocaleTimeString();
          NextDayBookingTime1stCond.setMinutes(NextDayBookingTime1stCond.getMinutes() + 15);
          this.timesData.push(Time)
        }
      }

    }
    return this.timesData

    // if (this.TodaysDate.toLocaleDateString() === data.pickupDate) {

    //   if (this.formatDateTimeToYYYYMMDDHHMMSS(this.TodaysDate) > '00:00:00' && this.formatDateTimeToYYYYMMDDHHMMSS(this.TodaysDate) < '07:00:00') {
    //     for (let i = 0; i < 96; i++) {
    //       BookingTime.setUTCMinutes(BookingTime.getUTCMinutes() + 15);
    //       let Time = BookingTime.toISOString().substring(11, 19); // Extract time part in UTC

    //       if (BookingTime.getUTCHours() == 0)
    //         break;
    //       this.timesData.push(Time);
    //     }
    //   } else if (this.formatDateTimeToYYYYMMDDHHMMSS(this.TodaysDate) >= '20:00:00' && this.formatDateTimeToYYYYMMDDHHMMSS(this.TodaysDate) < '23:59:59') {
    //     // Your existing logic for this condition
    //   } else {
    //     for (let i = 0; i < 96; i++) {
    //       if (BookingTime.getUTCHours() == 0)
    //         break;
    //       let Time = BookingTime.toISOString().substring(11, 19);
    //       BookingTime.setUTCMinutes(BookingTime.getUTCMinutes() + 15);
    //       this.timesData.push(Time);
    //     }
    //   }

    // } else {
    //   let NdayDate = new Date();
    //   NdayDate.setUTCDate(NdayDate.getUTCDate() + 1);
    //   let selectedDate = this.getPreviousDate(data.pickupDate);
    //   let currentDate = this.getPreviousDateCheck(this.TodaysDate.toLocaleDateString());

    //   if (this.formatDateTimeToYYYYMMDDHHMMSS(this.TodaysDate) > '20:00:00' && currentDate == selectedDate) {
    //     for (let i = 0; i < 68; i++) {
    //       let Time = NextDayBookingTime1stCond.toISOString().substring(11, 19);
    //       if (Time > '23:45:00' && Time < '07:00:00')
    //         break;
    //       NextDayBookingTime1stCond.setUTCMinutes(NextDayBookingTime1stCond.getUTCMinutes() + 15);
    //       this.timesData.push(Time);
    //     }
    //   } else {
    //     NextDayBookingTime1stCond.setUTCHours(0);
    //     NextDayBookingTime1stCond.setUTCMinutes(0);
    //     for (let i = 0; i < 96; i++) {
    //       let Time = NextDayBookingTime1stCond.toISOString().substring(11, 19);
    //       NextDayBookingTime1stCond.setUTCMinutes(NextDayBookingTime1stCond.getUTCMinutes() + 15);
    //       this.timesData.push(Time);
    //     }
    //   }
    // }
    // let newGenTime = [];
    // for (let i = 0; i <= this.timesData.length; i++) {
    //   if (this.timesData[i] != undefined)
    //     newGenTime.push(this.convertTo12HourFormat(this.timesData[i]))
    // }
    // return newGenTime

  }
  // Logic For Multi-Device
  convertTo12HourFormat(time: string): string {
    let [hours, minutes, seconds] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${this.padToTwoDigits(hours)}:${this.padToTwoDigits(minutes)}:${this.padToTwoDigits(seconds)} ${period}`;
  }
  padToTwoDigits(num: number): string {
    return num.toString().padStart(2, '0');
  }
  // Logic For Multi-Device



  convertDateString(inputDate: string): string {
    // Split the input date by the hyphen (-)
    const [year, month, day] = inputDate.split('-');

    // Convert month and day to numbers to remove any leading zeros
    const formattedMonth = Number(month);
    const formattedDay = Number(day);

    // Return the date in M/D/YYYY format
    return `${formattedMonth}/${formattedDay}/${year}`;
  }

  private roundTimeQuarterHour(time: any) {
    var timeToReturn = new Date(time);

    timeToReturn.setMilliseconds(Math.round(timeToReturn.getMilliseconds() / 1000) * 1000);
    timeToReturn.setSeconds(Math.round(timeToReturn.getSeconds() / 60) * 60);
    timeToReturn.setMinutes(Math.round(timeToReturn.getMinutes() / 15) * 15);

    return timeToReturn;
  }
  private formatDateTimeToYYYYMMDDHHMMSS(dateString: any) {
    // Create a Date object from the given date string
    let date = new Date(dateString);

    // Extract year, month, date, hours, minutes, and seconds
    let year: any = date.getFullYear();
    let month: any = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() returns month from 0-11
    let day: any = date.getDate().toString().padStart(2, '0');
    let hours: any = date.getHours().toString().padStart(2, '0');
    let minutes: any = date.getMinutes().toString().padStart(2, '0');
    let seconds: any = date.getSeconds().toString().padStart(2, '0');

    // Concatenate into YYYY-MM-DD HH:MM:SS format
    return `${hours}:${minutes}:${seconds}`;
  }

  private formatDate(datestring: any) {

    const yyyy = datestring.getFullYear();
    let mm = datestring.getMonth() + 1; // Months start at 0!
    let dd = datestring.getDate() + 1;

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday
  }

  private getPreviousDate(dateStr: any) {

    const date = new Date(dateStr);
    date.setDate(date.getDate() - 1);

    const previousMonth = date.getMonth() + 1;
    const previousDay = date.getDate();
    const previousYear = date.getFullYear();

    const formattedMonth = previousMonth < 10 ? `0${previousMonth}` : previousMonth;
    const formattedDay = previousDay < 10 ? `0${previousDay}` : previousDay;

    const previousDateStr = `${formattedMonth}/${formattedDay}/${previousYear}`;
    return previousDateStr;
  }
  private getPreviousDateCheck(dateStr: any) {

    const date = new Date(dateStr);
    date.setDate(date.getDate());

    const previousMonth = date.getMonth() + 1;
    const previousDay = date.getDate();
    const previousYear = date.getFullYear();

    const formattedMonth = previousMonth < 10 ? `0${previousMonth}` : previousMonth;
    const formattedDay = previousDay < 10 ? `0${previousDay}` : previousDay;

    const previousDateStr = `${formattedMonth}/${formattedDay}/${previousYear}`;
    return previousDateStr;
  }

}
