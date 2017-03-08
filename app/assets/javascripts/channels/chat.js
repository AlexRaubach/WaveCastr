$(document).ready(function() {

var lobby = window.location.pathname.replace(/\/episodes\//, "");
App.chat = App.cable.subscriptions.create({channel: "ChatChannel", lobby: lobby}, {
  connected: function() {
  },

  received: function(data) {
    this.post(data);
  },

  post: function(data) {
    this.addMessageToChat(data.message);
  },

  addMessageToChat: function(message) {
    var chatContainer = document.getElementById('chat-container');
    chatContainer.innerHTML = chatContainer.innerHTML + '<br>' + message;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
});

$('#send').on('click', function() {
  var guest = $('#current_user').text();
  var $input = $('#input');
  if ($input.val().length === 0) { return }

  App.chat.perform('chat', { guest: guest, message: $input.val() });
  $input.val('');
});

$('#input').on('keyup', function(e) {
  if (e.keyCode === 13) {
    $('#send').trigger('click');
  }
});

});
