$(document).ready(function() {

var lobby = window.location.pathname.replace(/\/episodes\//, "");
App.chat = App.cable.subscriptions.create({channel: "ChatChannel", lobby: lobby}, {
  connected: function() {
    console.log("Subscribed to ChatChannel");
  },

  received: function(data) {
    this.send(data);
  },

  send: function(data) {
    $('#chat-container').append(data.message);
  }
});

});
