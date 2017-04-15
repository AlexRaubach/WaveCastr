var Timer = function(element) {

  var seconds = 0,
    minutes = 0,
    hours = 0;

  function unitString(unit) {
    return unit < 10 ? '0' + unit : unit.toString();
  }

  function timeString() {
    if (seconds >= 60) {
      seconds = 0;
      minutes += 1;
    }
    if (minutes >= 60) {
      minutes = 0;
      hours += 1;
    }
    return unitString(hours) + ':' + unitString(minutes) + ':' + unitString(seconds);
  }

  element.innerText = timeString();

  this.start = function() {
    interval = setInterval(function() {
      seconds += 1;
      element.innerText = timeString();
    }, 1000);
  }

  this.stop = function() {
    clearInterval(interval);
  }
}