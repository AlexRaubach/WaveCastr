// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


$(document).ready(function(){
  // function $(id) { return document.getElementById(id); }
  $(".btn-group button").click(function(){
    var choice = this.innerHTML;
    $(".show-options").children().hide();
    switchDiv(choice);
  })

  var box = document.getElementById('box');
  var input = document.getElementById('input');
  var channel = window.location.pathname.replace(/\/episodes\//, "");
  var username;

  $("#click").on("click",function() {
    username = document.getElementById("test").value;
    $(".chat-start").toggle();
    $("#chat-container").toggle();
    $("#input-box").toggle();
    startChat();
  })
  function startChat(){
    var pubnub = new PubNub({
    subscribeKey: subscribeKey,
    publishKey: publishKey,
    uuid: username
    });
    pubnub.subscribe({channels:[channel]});



    pubnub.addListener({
      message: function(obj) {
        console.log(obj);
          box.innerHTML = (obj.publisher + ": " +obj.message).replace( /[<>]/g, '' ) + '<br>'+ box.innerHTML;
      }});


    $("#input").keyup(function(e) {
      if (e.which === 13) {
        pubnub.publish({channel : channel, message : input.value, x: (input.value='')});
      }
    })

    $("#send").on('click', function() {
      pubnub.publish({channel : channel, message : input.value, x: (input.value='')});
    })
  }
})






