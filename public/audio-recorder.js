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

var constraints = {
  audio: true,
  video: false
}

function initRecording() {
  if (navigator.mediaDevices) {
    console.log('getUserMediaSupported');
    navigator.mediaDevices.getUserMedia(constraints)
      .then(function (stream) {
        var mediaRecorder = new MediaStreamRecorder(stream);
        mediaRecorder.mimeType = 'audio/wav';
        mediaRecorder.recorderType = StereoAudioRecorder;

        start.onclick = function () {
          mediaRecorder.start();
          stop.disabled = false;
          console.log("recorder started");
          start.style.background = "red";
          start.style.color = "black";
        }

        var blobs = [];

        mediaRecorder.ondataavailable = function (blob) {
          blobs.push(blob)
        }

        stop.onclick = function () {
          mediaRecorder.stop();
          handleBlob();
          start.style.background = "";
          start.style.color = "";
        }

        function handleBlob() {
          console.log('recorder stopped');
          var sum = 0;
          for (var i = 0; i < blobs.length; i++) {
            console.log(blobs[i].size);
            sum += blobs[i].size;
          }
            var blob = new Blob(blobs, { 'type': 'audio/wav' } )
            console.log('Concatenated blob size: ' + blob.size);
            console.log('Sum of blobs array: ' + sum);
            var url = URL.createObjectURL(blob);
            blob.name = "__" + $('#current_user').text() + '__' + new Date().toISOString() + ".wav";

            var link = document.createElement('a');
            link.href = url;
            link.download = blob.name;
            link.innerHTML = link.download;
            document.getElementsByClassName('container')[0].appendChild(link);
            // var div = document.createElement('div');
            // $(div).addClass('track panel panel-default');
            // div.appendChild(link);
            //
            // $('#episode_track').fileupload({
            //   url: $('.directUpload').data('url'),
            //   type:            'POST',
            //   autoUpload:       true,
            //   formData: $('.directUpload').data('form-data'),
            //   paramName: 'file',
            //   dataType: 'XML',
            //   replaceFileInput: false
            // });
            //
            // $('#episode_track').fileupload('send', {
            //   files: [blob]
            // })
            //   .done(function(response){
            //     var episodeSharableLink = window.location.pathname.replace(/\/episodes\//, '');
            //     var xmlSerializer = new XMLSerializer();
            //     var s3String = xmlSerializer.serializeToString(response);
            //     var newTrackData = { sharable_link: episodeSharableLink, track: { s3_string: s3String } };
            //
            //     $.ajax({
            //       url: "/tracks",
            //       method: "POST",
            //       data: newTrackData
            //     })
            //       .done(function(response){
            //         $('#flash').flash("Your recording was successfully saved.", { fadeOut: 2000 });
            //       })
            //       .fail(function(response){
            //         $('#flash').flash('Sorry, something went wrong. A local version of your recording is available under the control panel.', { class: 'alert' });
            //         localRecording.appendChild(div);
            //       })
            //   }).fail(function(response) {
            //   $('#flash').flash('Sorry, something went wrong. Please try again.', { class: 'alert' });
            // });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  } else {
    console.log("getUserMedia not supported in your browser!");
  }
}
