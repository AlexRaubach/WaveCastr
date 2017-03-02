(function ($) {
  
  $.fn.flash = function(message, options) {
    var settings = $.extend({
      class: 'notice'
    }, options);

    var innerDiv = '<div class=' + settings.class + '>' + message + '</div>';
    var outerDiv = this;
    $(outerDiv).hide().html(innerDiv).fadeIn('slow', function() {
      if (settings.fadeOut) {
        setTimeout(function() { 
          $(outerDiv).children('div').fadeOut('slow', function() {
            $(this).remove();
          });
        }, settings.fadeOut);
      }
    });
  };

})(jQuery);
