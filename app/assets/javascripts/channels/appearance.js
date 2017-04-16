$(document).ready(function() {

var lobby = window.location.pathname.replace(/\/episodes\//, "");
App.appearance = App.cable.subscriptions.create({channel: "AppearancesChannel", lobby: lobby}, {
  received: function(data) {
    switch (data.status) {
      case 'signin':
        var guestTemplate = this.renderGuest(data);
        $(guestTemplate).hide().appendTo('#guest-list').fadeIn('slow');
        break;
      case 'signout':
        $('#guest-' + data.guest_id).fadeOut('slow', function() {
          $(this).remove();
        });
        break;
      case 'ready':
        $('#guest-' + data.guest_id).find('.fa-user').removeClass('waiting').addClass('ready');
        break;
      case 'recording':
        $('#guest-' + data.guest_id).find('.fa-user').removeClass('ready').addClass('recording');
        break;
      case 'stopping':
        $('#guest-' + data.guest_id).find('.fa-user').removeClass('recording').addClass('ready');
        break;            
      case 'error':
        $('#guest-' + data.guest_id).find('.fa-user').removeClass('waiting').addClass('error');
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
