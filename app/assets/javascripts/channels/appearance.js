function subscribeToAppearances() {
  App.appearance = App.cable.subscriptions.create({channel: "AppearancesChannel", lobby: lobby}, {
    received: function(data) {

      var $guestTemplate = $(data.template);
      var $guestDiv = $('#guest-' + data.guest_id);

      switch (data.status) {
        case 'signin':
          if (data.is_host && $guestDiv[0]) { return; }
          if (data.is_host) {
            $guestTemplate.hide().prependTo('#guest-list').fadeIn('slow');
          } else {
            $guestTemplate.hide().appendTo('#guest-list').fadeIn('slow');
          }
          break;
        case 'signout':
          $guestDiv.fadeOut('slow', function() {
            $(this).remove();
          });
          break;
        case 'ready':
          $guestDiv.find('.fa').removeClass('waiting').addClass('ready');
          break;
        case 'recording':
          $guestDiv.find('.fa').removeClass('ready').addClass('recording');
          break;
        case 'stopping':
          $guestDiv.find('.fa').removeClass('recording').addClass('ready');
          break;            
        case 'error':
          $guestDiv.find('.fa').removeClass('waiting').addClass('error');
      }
    }

  });
}
