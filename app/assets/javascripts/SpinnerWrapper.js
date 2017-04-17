var SpinnerWrapper = function(element) {

  var animated = browserSupportsCSSProperty('animation');

  function browserSupportsCSSProperty(propertyName) {
    var elm = document.createElement('div');
    propertyName = propertyName.toLowerCase();

    if (elm.style[propertyName] !== undefined)
      return true;

    var propertyNameCapital = propertyName.charAt(0).toUpperCase() + propertyName.substr(1),
      domPrefixes = 'Webkit Moz ms O'.split(' ');

    for (var i = 0; i < domPrefixes.length; i++) {
      if (elm.style[domPrefixes[i] + propertyNameCapital] !== undefined)
        return true;
    }

    return false;
  }

  var spinner;

  if (animated) {
    spinner = '<div class="spinner">\n\
                 <div class="rect1"></div>\n\
                 <div class="rect2"></div>\n\
                 <div class="rect3"></div>\n\
                 <div class="rect4"></div>\n\
                 <div class="rect5"></div>\n\
               </div>\n';
  } else {
    spinner = new Spinner({className: 'fallback-spinner'});
  }

  this.spin = function() {
    if (animated) {
      element.innerHTML = spinner;
    } else {
      spinner.spin(element);
    }
  }

  this.stop = function() {
    if (animated) {
      element.innerHTML = '';
    } else {
      spinner.stop();
    }
  }
};