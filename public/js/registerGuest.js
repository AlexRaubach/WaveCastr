$(window).load(function() {
  var $registerGuestModal = $('#register-guest-modal');

  $registerGuestModal.modal('show');

  $registerGuestModal.on('shown.bs.modal', function() {
    $('form input[type=text]').focus();
  });

  $('#new_guest').on('submit', function(e) {
    e.preventDefault();

    if (this['guest[name]'].value === '') {
      $('#modal-flash').flash("Please enter a name", {class: 'error'});
      return;
    }

    var formData = $(this).serialize();

    $.ajax({ data: formData, method: this.method, url: this.action })
      .done(function(response) {
        $registerGuestModal.modal('hide');
        document.getElementById('current_guest').innerText = response;
        initiateActionCable();
      })
      .fail(function(error) {
        $registerGuestModal.modal('hide');
        $('#flash').flash('ERROR: ' + error);
      });
  });
});

