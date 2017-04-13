// Set up MediaStream object

// Set MediaRecorder.ondataavailable to an event handler
// for the dataavailable event

// Create a MediaRecorder object, specifying source stream
// and options (mime type for wav)

// Call MediaRecorder.start() to begin recording

// datavailable event handler gets called every time there's
// data available

//Stop recording with MediaRecorder.stop()

// Check if media type is supported with MediaRecorder.isTypeSupported()

navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

var init = document.getElementById("init");
var start = document.getElementById("start");
var stop = document.getElementById("stopButton");

init.onclick = initRecording;

function initRecording() {
  if (navigator.getUserMedia) {
    console.log('getUserMediaSupported');
    navigator.getUserMedia(
      {audio: true},
      // Success callback
      function (stream) {
        var mediaRecorder = new MediaRecorder(stream);

        start.onclick = function () {
          mediaRecorder.start();
          stop.disabled = false;
          console.log(mediaRecorder.state);
          console.log("recorder started");
          start.style.background = "red";
          start.style.color = "black";
        }

        var chunks = [];

        mediaRecorder.ondataavailable = function (e) {
          chunks.push(e.data);
        }

        stop.onclick = function () {
          mediaRecorder.stop();
          console.log(mediaRecorder.state);
          console.log("recorder stopped");
          start.style.background = "";
          start.style.color = "";
        }

        mediaRecorder.onstop = function (e) {
          console.log("recorder stopped");

          var blob = new Blob(chunks, {'type': 'audio/wav'})
          var url = URL.createObjectURL(blob);
          blob.name = "__" + $('#current_user').text() + '__' + new Date().toISOString() + ".wav";
          console.log(blob);

          var link = document.createElement('a');
          link.href = url;
          link.download = blob.name;
          link.innerHTML = link.download;

          var div = document.createElement('div');
          $(div).addClass('track panel panel-default');
          div.appendChild(link);

          $('#episode_track').fileupload({
            url: $('.directUpload').data('url'),
            type:            'POST',
            autoUpload:       true,
            formData: $('.directUpload').data('form-data'),
            paramName: 'file',
            dataType: 'XML',
            replaceFileInput: false
          });

          $('#episode_track').fileupload('send', {
            files: [blob]
          })
            .done(function(response){
              var episodeSharableLink = window.location.pathname.replace(/\/episodes\//, '');
              var xmlSerializer = new XMLSerializer();
              var s3String = xmlSerializer.serializeToString(response);
              var newTrackData = { sharable_link: episodeSharableLink, track: { s3_string: s3String } };

              $.ajax({
                url: "/tracks",
                method: "POST",
                data: newTrackData
              })
                .done(function(response){
                  $('#flash').flash("Your recording was successfully saved.", { fadeOut: 2000 });
                })
                .fail(function(response){
                  $('#flash').flash('Sorry, something went wrong. A local version of your recording is available under the control panel.', { class: 'alert' });
                  localRecording.appendChild(div);
                })
            }).fail(function(response) {
            $('#flash').flash('Sorry, something went wrong. Please try again.', { class: 'alert' });
          });
        }

      },

      //Error callback
      function (err) {
        console.log('Error: ' + err);
      }
    );
  } else {
    console.log("getUserMedia not supported in your browser!");
  }
}
