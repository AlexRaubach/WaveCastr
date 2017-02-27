// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function(){

  $(function() {
    $('.directUpload').find("input:file").each(function(i, elem) {
      var fileInput    = $(elem);
      var form         = $(fileInput.parents('form:first'));
      var submitButton = form.find('input[type="submit"]');
      var progressBar  = $("<div class='bar'></div>");
      var barContainer = $("<div class='progress'></div>").append(progressBar);
      fileInput.after(barContainer);
      fileInput.fileupload({
        fileInput:       fileInput,
        url:             form.data('url'),
        type:            'POST',
        autoUpload:       true,
        formData:         form.data('form-data'),
        paramName:        'file', // S3 does not like nested name fields i.e. name="user[avatar_url]"
        dataType:         'XML',  // S3 returns XML if success_action_status is set to 201
        replaceFileInput: false
      });
    });
  });


  $(".next").click(function(){
    var $active = $(".slide-container div.active");
    var $next = $active.next();
    if (checkLast() == false){
      $next.addClass('active');
      $active.removeClass("active");
    }
  });

  $(".prev").click(function(){
    var $active = $(".slide-container div.active");
    var $prev = $active.prev();
    if (checkFirst() == false){
      $prev.addClass('active');
      $active.removeClass('active');
    }

  })
  function checkLast(){
    var check = false;
    var slides = $(".slide-container");
    if (slides.find('div:last').hasClass("active") == true){
      check = true;
    }
    return check;
  }

    function checkFirst(){
    var check = false;
    var slides = $(".slide-container");
    if (slides.find('div:first').hasClass("active") == true){
      check = true;
    }
    return check;
  }
})



var pubnub = new PubNub({
    subscribeKey: "pub-c-d4381d4f-440f-4eef-b35c-5bc6e23b2d78",
    publishKey: "sub-c-d4379b4c-fc95-11e6-ba92-02ee2ddab7fe"
})

var box = PUBNUB.$('box'), input = PUBNUB.$('input'), channel = 'chat';
debugger;





