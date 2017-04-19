$(document).ready(function() {

var lobby = window.location.pathname.replace(/\/episodes\//, "");
App.appearance = App.cable.subscriptions.create({channel: "AppearancesChannel", lobby: lobby}, {
  received: function(data) {
    switch (data.status) {
      case 'signin':
        if (data.is_host) {
          $(data.template).hide().prependTo('#guest-list').fadeIn('slow');
        } else {
          $(data.template).hide().appendTo('#guest-list').fadeIn('slow');
        }
        break;
      case 'signout':
        $('#guest-' + data.guest_id).fadeOut('slow', function() {
          $(this).remove();
        });
        break;
      case 'ready':
        $('#guest-' + data.guest_id).find('.fa').removeClass('waiting').addClass('ready');
        break;
      case 'recording':
        $('#guest-' + data.guest_id).find('.fa').removeClass('ready').addClass('recording');
        break;
      case 'stopping':
        $('#guest-' + data.guest_id).find('.fa').removeClass('recording').addClass('ready');
        break;            
      case 'error':
        $('#guest-' + data.guest_id).find('.fa').removeClass('waiting').addClass('error');
    }
  }

});

});
