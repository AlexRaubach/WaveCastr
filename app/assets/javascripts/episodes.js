// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

// $(document).ready(function(){
//   $('form').on('submit', function(event){
//     event.preventDefault();
//     sendToS3();
//   })
// })


















// function sendToS3() {
//   $('.directUpload').find("input:file").each(function(i, elem) {
//     var fileInput    = $(elem);
//     var form         = $(fileInput.parents('form:first'));
//     var submitButton = form.find('input[type="submit"]');
//     var progressBar  = $("<div class='bar'></div>");
//     var barContainer = $("<div class='progress'></div>").append(progressBar);
//     fileInput.after(barContainer);
//     input = fileInput
//     console.log(input);
//     console.log(form.data('url'))
//     console.log(form.data('form-data'))
//     fileInput.fileupload({
//       fileInput:       fileInput,
//       url:             form.data('url'),
//       type:            'POST',
//       autoUpload:       true,
//       formData:         form.data('form-data'),
//       paramName:        'file', // S3 does not like nested name fields i.e. name="user[avatar_url]"
//       dataType:         'XML',  // S3 returns XML if success_action_status is set to 201
//       replaceFileInput: false
//     });
//   })
//   .bind('fileuploaddone', function (e, data) {
//     var link = document.createElement('a');
//     link.href = data._response.result.documentElement.children[0].textContent;

//     var pathname =  link.pathname;
//     console.log(pathname);
//     console.log(link.href);
//     console.log("Success");

//     // $.ajax({
//     //   url: //this can post the link back to the file on S3 to the database
//     //   method: "POST"
//     //   data: pathname
//     // })
//   })

// };

$(document).ready(function(){
  // function $(id) { return document.getElementById(id); }
  $(".btn-group button").click(function(){
    var choice = this.innerHTML;
    $(".show-options").children().hide();
    switchDiv(choice);
  })


  var pubnub = new PubNub({
  subscribeKey: "sub-c-d4379b4c-fc95-11e6-ba92-02ee2ddab7fe",
  publishKey: "pub-c-d4381d4f-440f-4eef-b35c-5bc6e23b2d78"
  });
  var box = document.getElementById('box');
  var input = document.getElementById('input');
  var channel = 'test';

  pubnub.addListener({
    message: function(obj) {
        box.innerHTML = (''+obj.message).replace( /[<>]/g, '' ) + '<br>' + box.innerHTML
    }});

  pubnub.subscribe({channels:[channel]});


  $("#input").keyup(function(e) {
    if (e.which === 13) {
      console.log("works");
      pubnub.publish({channel : channel, message : input.value, x: (input.value='')});
    }
  })
})



function switchDiv(choice){
  switch (choice){
    case "settings":
      $(".settings").show();
      break;
    case "commands":
      $(".commands").show();
      break;
    case "recordings":
      $(".recordings").show();
      break;
    case "logs":
      $(".logs").show();
      break;
  }
}



