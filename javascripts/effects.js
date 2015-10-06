(function () {

  $.detailTimes = function (el) {
    this.$el = $(el);
    this.initialize();
  };

  $.detailTimes.prototype.initialize = function () {
    this.$el.on( "click", this.toggleClass.bind(this) );
  };

  $.detailTimes.prototype.toggleClass = function () {
    $(this.$el[0]).find(".field").toggleClass("hidden");
  };

  $.fn.detail = function () {
    $(".timeslot").each( function () {
      $(this).find(".field").addClass("hidden");
      new $.detailTimes(this);
    });
  };
})();

$(document).on("ready", function () {
  $(".timeslot").detail();
})
