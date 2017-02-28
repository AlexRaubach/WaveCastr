// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


$(document).ready(function(){
  $(".btn-group button").click(function(){
    var choice = this.innerHTML;
    $(".show-options").children().hide();
    switchDiv(choice);

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

// }

