App.appearance = App.cable.subscriptions.create("AppearancesChannel", {
  received: function(data) {
    var guestTemplate = this.renderGuest(data);
    $("#guest-list").append(guestTemplate);
  },

  renderGuest: function(data) {
    return `<div class="guest panel panel-default">
              <div class="panel-body">
                <p>
                  <h3>${data.guest}</h3>
                </p>
              </div>
            </div>`
  }
});
