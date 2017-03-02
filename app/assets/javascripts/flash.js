(function ($) {
  
  $.fn.flash = function(message, options) {
    var settings = $.extend({
      class: 'notice'
    }, options);

    var flash = '<div class=' + settings.class + '>' + message + '</div>';
    $(flash).hide().prependTo(this).fadeIn('slow', function() {
      var flash = this;
      if (settings.fadeOut) {
        setTimeout(function() { 
          $(flash).fadeOut('slow');
        }, settings.fadeOut);
      }
    });
  };

})(jQuery);
