$(document).ready(function() {

var lobby = window.location.pathname.replace(/\/episodes\//, "");
App.appearance = App.cable.subscriptions.create({channel: "AppearancesChannel", lobby: lobby}, {
  received: function(data) {
    switch (data.action) {
      case 'signin':
        console.log("Signing in " + data.guest + '...');
        var guestTemplate = this.renderGuest(data);
        $("#guest-list").append(guestTemplate);
        break;
      case 'signout':
        console.log('Signing out ' + data.guest + '...');
        $('#guest-' + data.guest_id).remove();
    }
  },

  renderGuest: function(data) {
    return '<div id="guest-' + data.guest_id + '" class="guest panel panel-default">' +
              '<div class="panel-body">' + 
                '<p><h3>' + data.guest + '</h3></p>' + 
              '</div>' +
            '</div>'
  }
});

});
