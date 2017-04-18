$(document).ready(function() {

var lobby = window.location.pathname.replace(/\/episodes\//, "");
App.tracks = App.cable.subscriptions.create({channel: "TracksChannel", lobby: lobby}, {
  received: function(data) {
    var $trackList = $('#track-list');
    if ($trackList.prop('hidden') === true) {
      $trackList.append(data.template).fadeIn('slow');
      $trackList.prop('hidden', false); // fadeIn doesn't remove hidden prop
    } else {
      $(data.template).hide().appendTo('#track-list').fadeIn('slow');
    }
  }
});

});
