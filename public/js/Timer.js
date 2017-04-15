var Timer = function(element) {
  var seconds = 0;

  setInterval(function() {
    seconds += 1;
    element.innerText = seconds;
  });
}