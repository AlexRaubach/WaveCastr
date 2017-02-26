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

// }
