$(document).on("ready", function () {
  $(this).find('.field').toggle();
});

$('.weekdays').on('click', '.timeslot', function () {
  $(this).find('.field').toggle();
});
