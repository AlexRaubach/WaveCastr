$(document).ready(function() {

var lobby = window.location.pathname.replace(/\/episodes\//, "");
App.tracks = App.cable.subscriptions.create({channel: "TracksChannel", lobby: lobby}, {
  received: function(data) {
    $('#track-list').append(data.template);
  }
});

});
