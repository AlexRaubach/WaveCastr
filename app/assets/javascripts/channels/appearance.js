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
        $('#guest-' + data.guest_id).find('.status-dot').removeClass('waiting').addClass('ready');
        break;
      case 'error':
        $('#guest-' + data.guest_id).find('.status-dot').removeClass('waiting').addClass('error');
    }
  },

  renderGuest: function(data) {
    return '<div id="guest-' + data.guest_id + '" class="guest">' +
              '<div>' + 
                '<div class="status-dot waiting"></div> ' +
                '<h3>' + data.guest + '</h3>' + 
              '</div>' +
            '</div>';
  }
});

});
