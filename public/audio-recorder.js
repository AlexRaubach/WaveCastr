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

        start.onClick = function () {
          mediaRecorder.start();
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

          var trackName = "__" + $('#current_user').text() + '__' + new Date().toISOString() + ".wav";

          var blob = new Blob(chunks, {'type': 'audio/wav'})
          console.log(blob);

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
