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

// Change start_time value into human-readable format
var formatTime = function ( timeObj ) {
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

// Add days of the week to DOM
var days = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
]

days.forEach( function( day ) {
  $("<ul/>", {
    "class": day + " weekday",
    html: "<h4 class=heading>" + day + "</h2>"
  }).appendTo( $( ".weekdays" ) )
  .css( "text-transform", "capitalize" );
});

// Add time values into days of the week
days.forEach( function( day ) {
  var startTimes = {};

  data.timeslots.forEach( function( timeslot ) {
    var timeStart = formatTime( timeslot.start_time ),
    timeEnd = formatTime( timeslot.end_time ),
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
