$(document).ready(function() {

var lobby = window.location.pathname.replace(/\/episodes\//, "");
App.chat = App.cable.subscriptions.create({channel: "ChatChannel", lobby: lobby}, {
  connected: function() {
    this.setChatEvent();
  },

  received: function(data) {
    console.log(data);
  },

  post: function(data) {
    $('#chat-container').append(data.message);
  },

  setChatEvent: function() {
    $('#send').on('click', function() {
      var guest = $('#current_user').text();
      var $input = $('#input');
      if ($input.val().length === 0) { return }

      App.chat.perform('send', { guest: guest, message: $input.val() });
      $input.val('');
    });
  }
});

});
