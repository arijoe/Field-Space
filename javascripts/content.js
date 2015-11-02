// data type of this anatomy:
// {
//     "id": 103594,
//     "field_id": 100002,
//     "start_date": "2015-05-11",
//     "end_date": "2015-05-21",
//     "start_time": "18:15:00",
//     "end_time": "20:15:00",
//     "sunday": 0,
//     "monday": 1,
//     "tuesday": 1,
//     "wednesday": 0,
//     "thursday": 0,
//     "friday": 1,
//     "saturday": 0,
//     "stage_id": 107469,
//     "field_name": "Edgely",
//     "field_surface": "grass"
// },

var days = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
],
months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// Change time value into human-readable format
var formatTime = function (timeObj) {
  var hours = timeObj.slice(0, 2);
  var minutes = timeObj.slice(3, 5);
  var meridian = ' AM';

  if ( hours > 12 ) {
    hours -= 12
    meridian = ' PM';
  } else if ( hours === 12 ) {
    meridian = ' PM';
  };

  return hours + ':' + minutes + meridian;
};

// Change date value into more accessible-readable format
var formatDate = function (dateObj) {
  var date = dateObj.split("-");
  return [months[date[1] - 1], date[2], date[0], dateObj, Date.parse(new Date(dateObj))];
};

var dateRange = function () {
  var starts = {}, ends = {}, minStart, maxEnd;

  data.timeslots.forEach( function (timeslot, idx) {
    starts[ Date.parse(timeslot.start_date) ] = idx;
    ends[ Date.parse(timeslot.end_date) ] = idx;
  });

  minTime = data.timeslots[starts[ Math.min.apply( null, Object.keys(starts) ) ]];
  maxTime = data.timeslots[ends[ Math.max.apply( null, Object.keys(ends) ) ]];

  return [minTime.start_date, maxTime.end_date];
};

///////////////////////

var addWeeks = function () {
  var range = dateRange(), min = new Date(range[0]),
    max = new Date(range[1]), minDay = min.getDay(), maxDay = max.getDay(),
    count = 0;

  $("<div/>", {
    "class":  count.toString() + " week",
    html: "<div class='weekdays'><h2>" + min + "</h2></div>"
  }).appendTo( $(".weeks") );
};

var addDays = function () {
  days.forEach( function( day ) {
    
    // Add days of the week to DOM
    $("<ul/>", {
      "class": day + " weekday",
      html: "<h3 class=heading>" + day.slice(0,3) + "</h3>"
    }).appendTo( $(".weekdays") )
    .css( "text-transform", "capitalize" );

    // Add time values into days of the week
    var startTimes = {};

    data.timeslots.forEach( function( timeslot ) {
      var timeStart = formatTime(timeslot.start_time),
      timeEnd = formatTime(timeslot.end_time),
      dateStart = formatDate(timeslot.start_date),
      dateEnd = formatDate(timeslot.end_date),
      flag = true;

      // If a timeslot is valid for that day...
      if ( timeslot[day] === 1 ) {

        // ...and other fields already exist for that time, add the field;...
        $.each( startTimes, function (startTime, fields) {
          if ( startTime === timeStart && flag ) {
            fields.push(
              [
                timeslot.field_name,
                timeEnd,
                timeslot.start_date,
                timeslot.end_date
              ]
             );
            flag = false;
          }
        });

        // ...else, add a new start-time for that day containing that field...
        if ( flag ) {
          startTimes[timeStart] = [
            [
              timeslot.field_name,
              timeEnd,
              timeslot.start_date,
              timeslot.end_date
            ]
          ];
        }
      } // end of if statement matching timeslot to day of week
    }); // end of timeslots iterator

    // ...now add each start-time-to-fields matching to the DOM
    $.each(startTimes, function (startTime, fieldData) {
      var timeEnd = fieldData[0][1],
      $el = $("<li/>", {
        "class": "timeslot",
        html: "<h6 class='time'>" +
              startTime + " - " + timeEnd + "</h6>"
      });

      $( "." + day ).append($el);

      fieldData.forEach( function (arr) {
        $el.append(
          "<span class='field'>" + arr[0] + "</span>"
        );
      });
    }); // end of DOM addition iterator
  });   // end of days iterator
};      // end of function

/////////////////////

$(document).on("ready", function () {
  addWeeks();
  addDays();
});
