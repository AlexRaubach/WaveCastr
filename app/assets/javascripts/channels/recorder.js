$(document).ready(function() {

var lobby = window.location.pathname.replace(/\/episodes\//, "");
App.recorder = App.cable.subscriptions.create({channel: "RecorderChannel", lobby: lobby}, {
  received: function(data) {
    switch (data.command) {
      case 'start':
        $(start).trigger('click');
        break;
      case 'stop':
        $(stopButton).trigger('click');
    }
  }
});

});
