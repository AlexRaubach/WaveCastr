$(document).ready(function() {

var lobby = window.location.pathname.replace(/\/episodes\//, "");
App.appearance = App.cable.subscriptions.create({channel: "AppearancesChannel", lobby: lobby}, {
  received: function(data) {
    console.log(data);
    switch (data.status) {
      case 'signin':
        console.log("Signing in " + data.guest + '...');
        var guestTemplate = this.renderGuest(data);
        $("#guest-list").append(guestTemplate);
        break;
      case 'signout':
        console.log('Signing out ' + data.guest + '...');
        $('#guest-' + data.guest_id).remove();
        break;
      case 'ready':
        console.log(data.guest + ' is ready...');
        $('#guest-' + data.guest_id).find('.status-dot').removeClass('waiting').addClass('ready');
        break;
      case 'error':
        console.log(data.guest + ' is unavailable...');
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
