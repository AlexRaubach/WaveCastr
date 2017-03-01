(function ($) {
  
  $.fn.flash = function(message, options) {
    var settings = $.extend({
      class: 'notice'
    }, options);

    this.prepend('<div class=' + settings.class + '>' + message + '</div>');
  };

})(jQuery);
