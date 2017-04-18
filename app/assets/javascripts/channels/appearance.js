$(document).ready(function() {

var lobby = window.location.pathname.replace(/\/episodes\//, "");
App.appearance = App.cable.subscriptions.create({channel: "AppearancesChannel", lobby: lobby}, {
  received: function(data) {
    if ("guest" in data) {
      if (data.status != 'signin') {
        var avatar = $('#guest-' + data.guest_id).find('.fa-user')
      }
    } else {
      var avatar = $('#host').find('.fa-user-circle-o')
    };

    switch (data.status) {
      case 'signin':
        var guestTemplate = this.renderGuest(data);
        $(guestTemplate).hide().appendTo('#guest-list').fadeIn('slow');
        break;
      case 'signout':
        avatar.fadeOut('slow', function() {
          $(this).remove();
        });
        break;
      case 'ready':
        avatar.removeClass('waiting').addClass('ready');
        break;
      case 'recording':
        avatar.removeClass('ready').addClass('recording');
        break;
      case 'stopping':
        avatar.removeClass('recording').addClass('ready');
        break;            
      case 'error':
        avatar.removeClass('waiting').addClass('error');
    }
  },

  renderGuest: function(data) {
    return '<div id="guest-' + data.guest_id + '" class="guest">' +
              '<div>' + 
                '<i class="fa fa-user fa-2x waiting" aria-hidden="true"></i> ' +
                '<h3>' + data.guest + '</h3>' + 
              '</div>' +
            '</div>';
  }
});

});
