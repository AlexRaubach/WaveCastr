$(document).ready(function() {

var lobby = window.location.pathname.replace(/\/episodes\//, "");
App.recorder = App.cable.subscriptions.create({channel: "RecorderChannel", lobby: lobby}, {
  received: function(data) {
    switch (data.command) {
      case 'start':
        document.dispatchEvent(startEvent);
        break;
      case 'stop':
        document.dispatchEvent(stopEvent);
        break;
      case 'init':
        document.dispatchEvent(initEvent);
    }
  }
});

});
