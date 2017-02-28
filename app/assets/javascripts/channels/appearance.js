$(document).ready(function() {

var lobby = window.location.pathname.replace(/\/episodes\//, "");
App.appearance = App.cable.subscriptions.create({channel: "AppearancesChannel", lobby: lobby}, {
  received: function(data) {
    switch (data.status) {
      case 'signin':
        var guestTemplate = this.renderGuest(data);
        $("#guest-list").append(guestTemplate);
        break;
      case 'signout':
        $('#guest-' + data.guest_id).remove();
        break;
      case 'ready':
        $('#guest-' + data.guest_id).find('.status-dot').removeClass('waiting').addClass('ready');
        break;
      case 'error':
        $('#guest-' + data.guest_id).find('.status-dot').removeClass('waiting').addClass('error');
    }
  },

  renderGuest: function(data) {
    return '<div id="guest-' + data.guest_id + '" class="guest panel panel-default">' +
              '<div class="panel-body">' + 
                '<p><h3><div class="status-dot waiting" ></div>' + data.guest + '</h3></p>' + 
              '</div>' +
            '</div>'
  }
});

});
