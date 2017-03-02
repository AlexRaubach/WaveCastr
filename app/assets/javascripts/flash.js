(function ($) {
  
  $.fn.flash = function(message, options) {
    var settings = $.extend({
      class: 'notice'
    }, options);

    var flash = '<div class=' + settings.class + '>' + message + '</div>';
    $(flash).hide().prependTo(this).fadeIn('slow', function() {
      if (settings.fadeOut) {
        setTimeout(() => $(this).fadeOut('slow'), settings.fadeOut);
      }
    });
  };

})(jQuery);
