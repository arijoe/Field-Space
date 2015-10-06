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
    "class": "weekday",
    "id": day,
    html: "<h2 class=heading>" + day + "</h2>"
  }).appendTo( $( ".weekdays" ) )
  .css( "text-transform", "capitalize" );
});

// fill weekdays with times of available fields
data.timeslots.forEach( function( timeslot ) {
  days.forEach( function( day ) {
    if ( timeslot[day] === 1 ) {
      var timeObj = timeslot.start_time
      $( "#" + day ).append(
        $("<li/>", {
          "class": "timeslot",
          html: "<span class=time>" + timeslot.start_time + ' - ' +
                timeslot.end_time + "</span>" +
                "<span class=field>" + timeslot.field_name + "</span>"
        })
      )
    }
  });
});
