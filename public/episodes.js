// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

  var box = document.getElementById('chat-container');
  var addToChatBox = function(string){
    box.innerHTML = box.innerHTML + '<br>'+ ("SYSTEM: " + string).replace( /[<>]/g, '' )
  }

$(document).ready(function(){
  // function $(id) { return document.getElementById(id); }
  $(".btn-group button").click(function(){
    var choice = this.innerHTML;
    $(".show-options").children().hide();
    switchDiv(choice);
  })

  var input = document.getElementById('input');
  var channel = window.location.pathname.replace(/\/episodes\//, "");
  var username = $('#current_user').text();
  startChat();


  function startChat(){
    var pubnub = new PubNub({
    subscribeKey: subscribeKey,
    publishKey: publishKey,
    uuid: username
    });
    pubnub.subscribe({channels:[channel]});



    pubnub.addListener({
      message: function(obj) {
          box.innerHTML = box.innerHTML + '<br>'+ (obj.publisher + ": " +obj.message).replace( /[<>]/g, '' )
          $chatBox[0].scrollTop = $chatBox[0].scrollHeight;
      }});

      var $chatBox = $('#chat-container');
      $chatBox[0].scrollTop = $chatBox[0].scrollHeight;

    $("#input").keyup(function(e) {
      if (e.which === 13) {
        pubnub.publish({channel : channel, message : input.value, x: (input.value='')});
      }
    })

    $("#send").on('click', function() {
      pubnub.publish({channel : channel, message : input.value, x: (input.value='')});
    })
  }

  $('#init').one('click', function(){
    $(this).css('width', '21.75%')
    $(this).text('Reactivate Mics')
    $('#start').show();

  })

  $('#start').on("click", function(){
    $(this).hide();
    $('#stopButton').show();
  })

  $('#stopButton').one("click", function(){
    $(this).hide();
    // breaks addToChatBox() when line comment switched below
    // $(#init).css('width', '44%');
    $('#start').show();
  })

})







