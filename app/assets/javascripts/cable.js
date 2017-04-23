// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//
//= require action_cable
//= require_self
//= require_tree ./channels

lobby = (function () {
  return window.location.pathname.replace(/\/episodes\//, "");
})();

function initiateActionCable() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();
  subscribeToAllChannels();
};

function subscribeToAllChannels() {
  subscribeToAppearances();
  subscribeToChat();
  subscribeToRecorder();
  subscribeToTracks();
}
